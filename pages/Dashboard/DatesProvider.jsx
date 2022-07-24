import DatingWindow from "./Dating";
import { useState,useEffect } from "react";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {auth, firestore} from '../../lib/firebase'
export default function DatesProvider() {
    const [userArray,setUserArray] = useState([])
    const passCard = (e) =>{
        const usrs = [...userArray]
        console.log(e.target.getAttribute('data'))
        usrs.splice(e.target.getAttribute('data'),1)
        setUserArray(usrs)
        console.log(userArray)
      }
    useEffect(()=>{
        const q = query(collection(firestore, 'users'))
        onSnapshot(q, (querySnapshot) => {
        setUserArray(querySnapshot.docs.filter(doc=>doc.id!==auth.currentUser?.uid).map(doc => ({
            id: doc.id,
            data: doc.data()
          })))})
    },[])
  return (
    userArray && <DatingWindow userArray={userArray} onClick={passCard}/>
  )
}