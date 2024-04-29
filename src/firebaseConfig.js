// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAJZ-SatZ2hRTT3a77lR3CaW997ah31XmQ",
    authDomain: "shift-management-system-38765.firebaseapp.com",
    projectId: "shift-management-system-38765",
    storageBucket: "shift-management-system-38765.appspot.com",
    messagingSenderId: "780212692700",
    appId: "1:780212692700:web:ae649832886bd559693619",
    measurementId: "G-GZY7XS9F2H"
  };
  

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


export { auth, firestore };
