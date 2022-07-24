import '../styles/globals.css'
import { UserContext } from '../lib/context'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '../lib/firebase';
import { useState, useEffect } from 'react'
function MyApp({ Component, pageProps }) {
const [user] = useAuthState(auth)
const [username, setUsername] = useState(null)

useEffect(()=>{
  let unsubscribe
  if (user){
    const ref = firestore.collection('users').doc(user.uid)
    unsubscribe = ref.onSnapshot((doc)=>{
      setUsername(doc.data()?.username)
    })
  } else {
    setUsername(null)
  }
  return unsubscribe
},[user])

  return (
  <UserContext.Provider value={{user, username}}>
    <Component {...pageProps} />
  </UserContext.Provider>
  )
}

export default MyApp
