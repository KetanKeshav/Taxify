// JavaScript
// src/firebase.js
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyA20GycisYutK-ISzy6xQw3n0Mt74Q_ccE",
    authDomain: "taxify-26401.firebaseapp.com",
    projectId: "taxify-26401",
    storageBucket: "taxify-26401.appspot.com",
    messagingSenderId: "345882928182",
    appId: "1:345882928182:web:17a0b91c25fdf40159e497",
  };

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  
  export {db}