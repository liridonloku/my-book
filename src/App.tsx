import React from "react";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { login, logout } from "./app/features/user/user";
import { useDispatch } from "react-redux";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const authStateObserver = (user: any) => {
    if (user) {
      // User is signed in
      let auth = getAuth();
      let name = auth.currentUser?.displayName || "";
      let id = auth.currentUser?.uid || "";
      let email = auth.currentUser?.email || "";
      let photoUrl = auth.currentUser?.photoURL || "";
      dispatch(login({ name, id, email, photoUrl }));
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
