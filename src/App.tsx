import React, { useEffect } from "react";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app/cloudinary";
import Home from "./components/Home";
import People from "./components/People";
import Preload from "./components/Preload";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { login, logout } from "./app/features/user/user";
import { populateFriendsList } from "./app/features/friends/friends";
import { useDispatch } from "react-redux";
import { getFriendRequests, getPeople, getPostsFromDB } from "./app/firebase";
import {
  populateReceivedRequests,
  populateSentRequests,
} from "./app/features/friendRequests/friendRequests";
import UserPage from "./components/UserPage";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const authStateObserver = async (user: any) => {
    if (user) {
      // User is signed in
      let auth = getAuth();
      let name = auth.currentUser?.displayName || "";
      let id = auth.currentUser?.uid || "";
      let email = auth.currentUser?.email || "";
      let photoUrl = auth.currentUser?.photoURL || "";

      //Populate people list
      const people = await getPeople(dispatch);

      //Populate posts
      await getPostsFromDB(dispatch);

      //Populate friends list and requests
      const logedInUser = people.find((person) => person.id === id);
      if (logedInUser) {
        dispatch(populateFriendsList(logedInUser.friendList));
        populateFriendRequests(logedInUser.id);
      }
      dispatch(login({ name, id, email, photoUrl }));
    } else {
      dispatch(logout());
    }
  };

  const populateFriendRequests = async (userId: string) => {
    const requests = await getFriendRequests();
    const sentRequests = requests
      .filter((request) => request.senderId === userId)
      .map((request) => ({ ...request, date: request.date.toMillis() }));
    const receivedRequests = requests
      .filter((request) => request.receiverId === userId)
      .map((request) => ({ ...request, date: request.date.toMillis() }));
    dispatch(populateSentRequests(sentRequests));
    dispatch(populateReceivedRequests(receivedRequests));
  };

  // Initialize firebase auth
  const initFirebaseAuth = () => {
    // Listen to auth state changes.
    onAuthStateChanged(getAuth(), authStateObserver);
  };
  useEffect(() => {
    initFirebaseAuth();
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Preload />} />
        <Route path="/home" element={<Home />} />
        <Route path="/people" element={<People />} />
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
