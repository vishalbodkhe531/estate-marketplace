// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-marcketplace.firebaseapp.com",
  projectId: "estate-marcketplace",
  storageBucket: "estate-marcketplace.appspot.com",
  messagingSenderId: "785789726950",
  appId: "1:785789726950:web:c68965d32005c5d6910b27",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
