// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEmXOEMUZ4nMAabh328dZQVsbES-XR20g",
  authDomain: "proyecto-backfront-a70ce.firebaseapp.com",
  projectId: "proyecto-backfront-a70ce",
  storageBucket: "proyecto-backfront-a70ce.appspot.com",
  messagingSenderId: "231438685747",
  appId: "1:231438685747:web:b782a887af692be31af546"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection(users);

module.exports = User;