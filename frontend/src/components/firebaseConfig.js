import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC1EhmBxv62wFC4mZ53pWwhZ2cmlsxzLb4",
  authDomain: "possible-coast-432420-b1.firebaseapp.com",
  projectId: "possible-coast-432420-b1",
  storageBucket: "possible-coast-432420-b1.appspot.com",
  messagingSenderId: "851592020188",
  appId: "1:851592020188:web:f559f7aefb9992cb6ff419",
  measurementId: "G-DH4FQT1CHS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase modules
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, googleProvider, signInWithPopup, storage, db };
