import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB5FngcQECpYrAMYvjpVI6d25HI33vU4I8",
    authDomain: "tinder-clone-36b11.firebaseapp.com",
    projectId: "tinder-clone-36b11",
    storageBucket: "tinder-clone-36b11.appspot.com",
    messagingSenderId: "650973257569",
    appId: "1:650973257569:web:b9c49dfec81de635456f20",
    measurementId: "G-5Z6FW6G653"
}

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;