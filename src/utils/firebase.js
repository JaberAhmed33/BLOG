// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "jaber-blog-14980.firebaseapp.com",
  projectId: "jaber-blog-14980",
  storageBucket: "jaber-blog-14980.appspot.com",
  messagingSenderId: "295535390757",
  appId: "1:295535390757:web:53365050f328d63bf48fcc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);