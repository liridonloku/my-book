import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { login } from "./features/user/user";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJeuK5NKsI9rR6d7sritZe_8cUPcJJg-U",
  authDomain: "my-book-70922.firebaseapp.com",
  projectId: "my-book-70922",
  storageBucket: "my-book-70922.appspot.com",
  messagingSenderId: "330778131951",
  appId: "1:330778131951:web:893d4e8c3b36c2c2954a1a",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);

export const logInWithGoogle = async () => {
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
};

export const logOutUser = () => {
  signOut(getAuth());
};
