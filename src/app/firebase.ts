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
  deleteDoc,
  DocumentReference,
  DocumentData,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { addPeople } from "./features/people/people";
import { populatePosts } from "./features/posts/posts";
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
      friendList: [id],
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

export const changeProfilePicture = async (imageUrl: string) => {
  let user = getAuth().currentUser;
  if (user) {
    await updateProfile(user, { photoURL: imageUrl });
  }
};

export const changePersonPhotoUrl = async (
  userId: string,
  imageUrl: string
) => {
  await updateDoc(doc(db, "people", userId), {
    photoUrl: imageUrl,
  });
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

export const getPeople = async (dispatch?: AppDispatch) => {
  const querySnapshot = await getDocs(collection(db, "people"));
  const people = querySnapshot.docs.map((person) => person.data());
  if (dispatch) {
    dispatch(addPeople(Array.from(people)));
  }
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

export const deleteFriendRequest = async (
  senderId: string,
  receiverId: string
) => {
  const querySnapshot = await getDocs(collection(db, "friendRequests"));
  let ref: DocumentReference<DocumentData>;
  querySnapshot.forEach((request) => {
    if (
      //Sender and receiver match
      request.data().senderId === senderId &&
      request.data().receiverId === receiverId
    ) {
      ref = request.ref;
      deleteDoc(ref);
    }
  });
};

export const addToFriendsList = async (userId: string, newFriendId: string) => {
  //Add to each others friendList
  updateDoc(doc(db, "people", userId), {
    friendList: arrayUnion(newFriendId),
  });
  updateDoc(doc(db, "people", newFriendId), {
    friendList: arrayUnion(userId),
  });

  //Delete request
  deleteFriendRequest(newFriendId, userId);

  //In case they have sent each other a request simultaneously
  deleteFriendRequest(userId, newFriendId);
};

export const removeFromFriendsList = async (
  userId: string,
  friendId: string
) => {
  //Remove from each others friendList
  await updateDoc(doc(db, "people", userId), {
    friendList: arrayRemove(friendId),
  });
  await updateDoc(doc(db, "people", friendId), {
    friendList: arrayRemove(userId),
  });
};

export const addNewPostToDB = async (
  userId: string,
  caption: string,
  image: string
) => {
  const newPostRef = doc(collection(db, "posts"));
  await setDoc(newPostRef, {
    postId: newPostRef.id,
    userId,
    caption,
    image,
    date: serverTimestamp(),
    likes: [],
    comments: [],
  });
  return await getDoc(newPostRef);
};

const convertDates = (posts: DocumentData[]) => {
  const convertedDates = posts.map((post) => {
    post.date = post.date.toMillis();
    return post;
  });
  return convertedDates;
};

export const getPostsFromDB = async (dispatch?: AppDispatch) => {
  const querySnapshot = await getDocs(
    query(collection(db, "posts"), orderBy("date", "desc"))
  );
  const posts = convertDates(querySnapshot.docs.map((post) => post.data()));
  if (dispatch) dispatch(populatePosts(posts));
  return posts;
};

export const likePostInDB = async (postId: string, userId: string) => {
  await updateDoc(doc(db, "posts", postId), {
    likes: arrayUnion(userId),
  });
};

export const unlikePostInDB = async (postId: string, userId: string) => {
  await updateDoc(doc(db, "posts", postId), {
    likes: arrayRemove(userId),
  });
};

export const sendCommentToDB = async (
  id: string,
  postId: string,
  userId: string,
  content: string
) => {
  const comment = {
    id,
    userId,
    content,
    date: Timestamp.now().toMillis(),
  };
  await updateDoc(doc(db, "posts", postId), {
    comments: arrayUnion(comment),
  });
};

export const deleteCommentFromDB = async (
  postId: string,
  commentId: string
) => {
  const post = await getDoc(doc(db, "posts", postId));
  const comments: any[] = post.data()?.comments;
  const filtered = comments.filter((comment) => comment.id !== commentId);
  updateDoc(doc(db, "posts", postId), {
    comments: filtered,
  });
};

export const deletePostFromDB = async (postId: string) => {
  deleteDoc(doc(db, "posts", postId));
};
