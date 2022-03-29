import React from "react";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import People from "./components/People";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { login, logout } from "./app/features/user/user";
import { populateFriendsList } from "./app/features/friends/friends";
import { useDispatch } from "react-redux";
import { getPeople } from "./app/firebase";

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
      dispatch(login({ name, id, email, photoUrl }));

      //Populate people list
      const people = await getPeople(dispatch);

      //Populate friends list
      const logedInUser = people.find((person) => person.id === id);
      if (logedInUser) {
        dispatch(populateFriendsList(logedInUser.friendList));
      }
    } else {
      dispatch(logout());
    }
  };
  // Initialize firebase auth
  const initFirebaseAuth = () => {
    // Listen to auth state changes.
    onAuthStateChanged(getAuth(), authStateObserver);
  };

  initFirebaseAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/people" element={<People />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
