import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCw89Dkx6WYGrnn_FLby0WV9V_iHQvHPyI",
  authDomain: "grading-19e34.firebaseapp.com",
  projectId: "grading-19e34",
  storageBucket: "grading-19e34.appspot.com",
  messagingSenderId: "229056762303",
  appId: "1:229056762303:web:73bcfbbc31fc1de379110a",
  measurementId: "G-4W6X0TPLLQ"
};

initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()

export { db, auth }