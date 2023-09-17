// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0IEIowjpLvAv5pM0ZPatUfMBas604HeU",
    authDomain: "chatify-4670f.firebaseapp.com",
    projectId: "chatify-4670f",
    storageBucket: "chatify-4670f.appspot.com",
    messagingSenderId: "609898730457",
    appId: "1:609898730457:web:7ca48e52514b4e6f97ffc8"
  };
  
  // Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const storage = getStorage();
export const db = getFirestore(app)