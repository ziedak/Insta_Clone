// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGEBUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// }

const firebaseConfig = {
  apiKey: 'AIzaSyAC1z0g_1adY2AIG6ueDVSFqlsmQziWnkk',
  authDomain: 'insta-6edb3.firebaseapp.com',
  projectId: 'insta-6edb3',
  storageBucket: 'insta-6edb3.appspot.com',
  messagingSenderId: '183601028263',
  appId: '1:183601028263:web:8139bcbcd58fb993e50f82',
  measurementId: 'G-838JGTYEDH',
}

console.log(firebaseConfig)
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
//const analytics = getAnalytics()
const db = getFirestore()
const storage = getStorage()

export { app, db, storage }
