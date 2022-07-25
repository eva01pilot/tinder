import DatingWindow from "./Dating";
import { useState,useEffect } from "react";
import {collection, query, doc, onSnapshot, updateDoc} from "firebase/firestore"
import {auth, firestore} from '../../lib/firebase'

export default function DatesProvider() {
    const [userArray,setUserArray] = useState([])
    const [myData,setMyData] = useState([])
    const passCard = (e) =>{
        switch(e.target.value){
          case 'like':{
            const userRef = doc(firestore, 'users', auth.currentUser.uid)
            let noDuplicates = false
            const q = query(collection(firestore, 'users'))
            onSnapshot(q, (querySnapshot) => {
              const userMe = querySnapshot.docs.filter(doc=>doc.id===auth.currentUser?.uid)
              //console.log(userMe[0].data().liked.indexOf(e.target.getAttribute('uid'))===-1)
              if(userMe[0].data().liked.indexOf(e.target.getAttribute('uid'))===-1) {
                noDuplicates = true
              } else {
                noDuplicates = false
              }
              console.log(noDuplicates)
              if(noDuplicates){
                try {
                   updateDoc(userRef, {
                  liked:[...myData[0].liked,e.target.getAttribute('uid')]
              })
              } catch (err) {
                alert(err)
              }    
            
          }})

            //if(noDuplicates){
              //try {
              //await updateDoc(userRef, {
               // liked:[...myData[0].liked,e.target.getAttribute('uid')]
           // })
           // } catch (err) {
           //   alert(err)
           // }    
          }
          } 
        
        const usrs = [...userArray]
        usrs.splice(e.target.getAttribute('data'),1)
        setUserArray(usrs)
    }
    useEffect(()=>{
        const q = query(collection(firestore, 'users'))
        onSnapshot(q, (querySnapshot) => {
        setUserArray(querySnapshot.docs.filter(doc=>doc.id!==auth.currentUser?.uid).map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        setMyData(querySnapshot.docs.filter(doc=>doc.id===auth.currentUser?.uid).map((doc)=>({
          name: doc.data().username,
          age: doc.data().userage, 
          gender: doc.data().usergender,
          liked: doc.data().liked
      })))}
          ) 
    },[])
  return (
    myData && userArray && <DatingWindow myself={myData} userArray={userArray} onClick={passCard}/>
  )
}