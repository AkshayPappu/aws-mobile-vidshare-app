// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHsgzgoP1TatQsKGLAvPEs5XS6OkEttcA",
  authDomain: "videoapp-d9eef.firebaseapp.com",
  projectId: "videoapp-d9eef",
  storageBucket: "videoapp-d9eef.appspot.com",
  messagingSenderId: "69475666938",
  appId: "1:69475666938:web:24aa7ce7f5b87530c03243",
  measurementId: "G-W0BYZV31GQ"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP); 
export const FIREBASE_DB = getFirestore(FIREBASE_APP);