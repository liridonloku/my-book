/* eslint-disable @typescript-eslint/no-unused-vars */
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
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { login } from "./features/user/user";
import { AppDispatch } from "./store";
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
const auth = getAuth();

export const logInWithGoogle = async () => {
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
};

export const logOutUser = async () => {
  await signOut(getAuth());
};

interface NewUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const createNewAccount = async (
  { firstName, lastName, email, password, confirmPassword }: NewUserData,
  dispatch: AppDispatch
) => {
  if (password === confirmPassword) {
    const userCredential = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );
    let user = getAuth().currentUser;
    if (user) {
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      let name = user.displayName || "";
      let id = user.uid || "";
      let email = user.email || "";
      let photoUrl = user.photoURL || "";
      dispatch(login({ name, id, email, photoUrl }));
    }
    return userCredential;
  } else {
    console.error("Passwords don't match");
  }
};

export const logInWithEmail = async ({ email, password }: LoginData) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

//TODO: Handle password reset
export const sendResetPasswordLink = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};
