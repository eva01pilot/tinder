import DateCard from "../../Components/DateCard"
import { UserContext } from '../../lib/context'
import { firestore } from '../../lib/firebase'
import Router from 'next/router'
import { useEffect,useContext,useState } from 'react'
import styles from '../../styles/Dating.module.scss'
import {  AnimatePresence } from "framer-motion"
import {collection, query, onSnapshot} from "firebase/firestore"
export default function DatingWindow(props) {
  const [likedArray, setLikedArray] = useState([])
  const {user, username} = useContext(UserContext)
  const fetchDatesByIds = (likedArray) =>{
    const q = query(collection(firestore, 'users'))
        onSnapshot(q, (querySnapshot) => {
        likedArray?.map((likedId)=>setLikedArray(querySnapshot.docs.filter(doc=>doc.data().uid==likedId).map((doc)=>({
          uid: doc.data().uid,
          name:doc.data().username,
          age: doc.data().userage
        }))))
        
    }
  )}
  useEffect(()=>{
    fetchDatesByIds(props?.myself[0]?.liked)
    console.log(props?.userArray[0]?.data.uid) 
    !username && Router.push('../') 
  },[username,props.myself])

  return (
    <main>
      <div className={styles.maincontainer}>
        <div className={styles.matches}>
            <h1>Вы лайкнули:</h1>
            <ul>{likedArray?.map((likeduser)=>{
              return(
                  <li key={likeduser} style={{listStyle:`none`}}>
                    <h1>{likeduser.name}, {likeduser.age}</h1>
                    <br/>
                  </li>
              )
            })}</ul>
        </div>
        <div className={styles.DatesContainer}>
          <AnimatePresence>
            {props.userArray?.filter(user=>props.myself[0].liked.indexOf(user.data.uid)===-1).map((user,i)=>{
                return(
                    <DateCard isVisible={true} onClick={props.onClick} key={user.id} data={i} sweetheart={user.data}/>
                )
            })}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}