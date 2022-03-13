// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKc3PiMzgMhbVawvDhYI84rzwusYUR1B8",
  authDomain: "branches-5434a.firebaseapp.com",
  projectId: "branches-5434a",
  storageBucket: "branches-5434a.appspot.com",
  messagingSenderId: "583989852606",
  appId: "1:583989852606:web:53bc421e4e84402d0ba1ef",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
