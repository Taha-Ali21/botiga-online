// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAs_HUt0qYNpBawKNUkXPuJixyhyj0jx4c",
  authDomain: "botiga-online-7e3de.firebaseapp.com",
  projectId: "botiga-online-7e3de",
  storageBucket: "botiga-online-7e3de.firebasestorage.app",
  messagingSenderId: "891459609314",
  appId: "1:891459609314:web:4fce52d52c6ba4533674bb",
  measurementId: "G-W0SWLK11T3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);