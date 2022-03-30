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

import {
  getFirestore,
  setDoc,
  doc,
  addDoc,
  getDoc,
  getDocs,
  collection,
  Timestamp,
} from "firebase/firestore";
import { addPeople } from "./features/people/people";
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

const addGoogleAccountPersonToDB = async () => {
  const user = auth.currentUser;
  try {
    if (user) {
      const querySnapshot = await getDocs(collection(db, "people"));
      const people = querySnapshot.docs.map((person) => person.data());
      if (people.some((person) => person.id === user.uid)) return;
      let name = user.displayName || "";
      let id = user.uid || "";
      let email = user.email || "";
      let photoUrl = user.photoURL || "";
      addPersonToDB({ id, name, email, photoUrl });
    }
  } catch (error) {
    console.log("Could not add user to database", error);
  }
};

export const logInWithGoogle = async () => {
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
  await addGoogleAccountPersonToDB();
};

export const logOutUser = async () => {
  await signOut(getAuth());
  //Clear the redux state
  window.location.reload();
};

interface Person {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
}

const addPersonToDB = async ({ id, name, email = "", photoUrl }: Person) => {
  try {
    await setDoc(doc(db, "people", id), {
      id,
      name,
      email,
      photoUrl,
      friendList: [],
    });
  } catch (error) {
    console.log(error);
  }
};

interface NewUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const createNewAccount = async (
  { firstName, lastName, email, password, confirmPassword }: NewUserData,
  dispatch: AppDispatch
) => {
  if (password === confirmPassword) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
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
      await addPersonToDB({ id, name, email, photoUrl });
      dispatch(login({ name, id, email, photoUrl }));
    }
    return userCredential;
  } else {
    return Error("Passwords don't match.");
  }
};

interface LoginData {
  email: string;
  password: string;
}

export const logInWithEmail = async ({ email, password }: LoginData) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const sendResetPasswordLink = async (email: string) => {
  return await sendPasswordResetEmail(auth, email);
};

export const getPeople = async (dispatch: AppDispatch) => {
  const querySnapshot = await getDocs(collection(db, "people"));
  const people = querySnapshot.docs.map((person) => person.data());
  dispatch(addPeople(Array.from(people)));
  return people;
};

export const getFriendRequests = async () => {
  const querySnapshot = await getDocs(collection(db, "friendRequests"));
  const friendRequests = querySnapshot.docs.map((request) => request.data());
  return friendRequests;
};

export const sendFriendRequest = async (
  senderId: string,
  receiverId: string,
  status: string = "pending"
) => {
  //Check if request is already sent
  const friendRequests = await getFriendRequests();
  const requestExists = friendRequests.some(
    (request) =>
      request.senderId === senderId && request.receiverId === receiverId
  );
  if (requestExists) return;
  try {
    await addDoc(collection(db, "friendRequests"), {
      senderId,
      receiverId,
      status,
      date: Timestamp.now(),
    });
  } catch (error) {
    console.log(error);
  }
};
