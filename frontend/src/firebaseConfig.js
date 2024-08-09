// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyChtmSMIX4D8MxOeTs6w50AOnsmsWHhinE",
    authDomain: "job-hunter-a20f5.firebaseapp.com",
    projectId: "job-hunter-a20f5",
    storageBucket: "job-hunter-a20f5.appspot.com",
    messagingSenderId: "68473325815",
    appId: "1:68473325815:web:fbf721ccd71e10fa1d6bf2",
    measurementId: "G-3DZS6LQTEE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);

export { db, auth, googleProvider, signInWithPopup, storage };
