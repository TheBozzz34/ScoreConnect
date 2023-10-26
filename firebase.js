import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAnl6q3ShBcwuegMjizW-T7rseUyneZs2s",
    authDomain: "scoreconnect-a8d83.firebaseapp.com",
    projectId: "scoreconnect-a8d83",
    storageBucket: "scoreconnect-a8d83.appspot.com",
    messagingSenderId: "310270854979",
    appId: "1:310270854979:web:d66ac88153a6f2023951f6",
    measurementId: "G-G3GH38QDFZ"
  };
  
   
  // Initialize Firebase
  const app = initializeApp(firebaseConfig); // Initialize Firebase Authentication and get a reference to the service
  export const auth = getAuth(app);
  export const provider = new GoogleAuthProvider();
  export default app;