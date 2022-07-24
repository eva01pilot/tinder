import { useState, useEffect } from "react"
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {firestore} from './firebase'
export const useFetchDates = () =>{
    const [userArray, setUserArray] = useState([{}])
    useEffect(()=>{
    const q = query(collection(firestore, 'users'))
    onSnapshot(q, (querySnapshot) => {
        setUserArray(querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))})
},[JSON.stringify(userArray)])
    console.log(userArray)
    return userArray
}

  