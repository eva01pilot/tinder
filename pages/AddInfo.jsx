import {firestore, storage, auth, STATE_CHANGED} from '../lib/firebase'
import {collection, addDoc, Timestamp, batch} from 'firebase/firestore'
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
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
  useEffect(()=>{
    console.log(user)
  })
  return (
    <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>Введите имя</label>
          <input required id='username' onChange={(e)=>setName(e.target.value)}/>
          <label htmlFor='userage'>Введите свой возраст</label>
          <input required id='userage' onChange={(e)=>setAge(e.target.value)}/>
          <h1>Выберите пол</h1>
          <label htmlFor='male'>Мужчина</label>
          <input required type="radio" id='male' name='gender' value="male" onChange={(e)=>setGender(e.target.value)}/>
          <label htmlFor='female'>Женщина</label>
          <input required  type="radio" id='female' name='gender' value="female" onChange={(e)=>setGender(e.target.value)}/>
          <textarea required onChange={(e) => setDescription(e.target.value)}
          placeholder='Расскажите о себе'
          value={description}/>
          <label className="btn">
            📸 Upload Img
            <input type="file" onChange={uploadFile} accept="image/x-png,image/gif,image/jpeg" />
          </label>
          <img src={downloadURL}/>
          <h1>{downloadURL}</h1>
          <button type='submit'>Зарегистрироваться</button>
        </form>
    </section>
  )
}