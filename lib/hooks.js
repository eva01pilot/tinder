import { useState, useEffect } from "react"
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {auth, firestore} from './firebase'
export const useFetchDates = () =>{
    const [userArray, setUserArray] = useState([{}])
    useEffect(()=>{
    const q = query(collection(firestore, 'users'))
    onSnapshot(q, (querySnapshot) => {
        setUserArray(querySnapshot.docs.filter(doc=>doc.id!==auth.currentUser?.uid).map(doc => ({
            id: doc.id,
            data: doc.data()
          })))})
},[JSON.stringify(userArray)])
    return userArray
}

  