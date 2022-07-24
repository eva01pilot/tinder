import {firestore, storage, auth, STATE_CHANGED} from '../lib/firebase'
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import  styles from '../styles/AddInfo.module.scss'
export default function AddInfo({ }) {
  const [name,setName] = useState("")
  const [age,setAge] = useState()
  const [gender, setGender] = useState("")
  const [description, setDescription] = useState("")
  const [downloadURL, setDownloadURL] = useState("")
  const [user] = useAuthState(auth)
  const uploadFile = async (e)=>{
    const file = Array.from(e.target.files)[0]
    const ext = file.type.split('/')[1]
    const ref = storage.ref(`uploads/${auth.currentUser.uid}/${Date.now()}.${ext}`)
    const task = ref.put(file);

    task.on(STATE_CHANGED, (snapshot) => {
      task
        .then((d) => ref.getDownloadURL())
        .then((url) => {
          setDownloadURL(url);
        });
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const userDoc = firestore.doc(`users/${user.uid}`);
    const batch = firestore.batch();
    batch.set(userDoc, { uid:auth.currentUser.uid, username: name, userage:age, usergender:gender, profilepic: downloadURL, description:description, liked:[], matched:[]  });
    await batch.commit();
    }
    
  return (
    <div className={styles.FormContainer}>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>Введите имя</label>
          <input type="text" required id='username' onChange={(e)=>setName(e.target.value)}/>
          <label htmlFor='userage'>Введите свой возраст</label>
          <input type="text" required id='userage' onChange={(e)=>setAge(e.target.value)}/>
          <div className="GenderContainer">
            <label htmlFor='male'>Мужчина</label>
            <input required type="radio" id='male' name='gender' value="male" onChange={(e)=>setGender(e.target.value)}/>
            <label htmlFor='female'>Женщина</label>
            <input required  type="radio" id='female' name='gender' value="female" onChange={(e)=>setGender(e.target.value)}/>
          </div>
          <textarea rows="5" cols="30" maxLength="150" required onChange={(e) => setDescription(e.target.value)}
          placeholder='Расскажите о себе'
          value={description}/>
          <label className={styles.btn}>
            📸 Загрузите фотографию
            <input className={styles.inputfile} type="file" onChange={uploadFile} accept="image/x-png,image/gif,image/jpeg" />
          </label>
          <h3>{downloadURL}</h3>
          <button type='submit'>Зарегистрироваться</button>
        </form>
    </div>
  )
}