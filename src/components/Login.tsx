import React from "react";
import { useDispatch } from "react-redux";
import StyledLogin from "./styles/Login.styled";
import { googleLogIn } from "../app/features/user/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import useLoginStatus from "../helpers/useLoginStatus";
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";

interface Props {}
interface Dispatch {
  dispatch: ActionCreatorWithPayload<{}> | ActionCreatorWithoutPayload;
}

const Login: React.FC<Props> = () => {
  //Redirect to login if there's no user prop
  const user = useSelector((state: RootState) => state.user);
  useLoginStatus(user);
  //This part needs to be moved to userSlice
  const dispatch: Dispatch["dispatch"] = useDispatch();

  return (
    <StyledLogin>
      <div className="main">
        <div className="container">
          <div className="welcome">
            <h1 className="logo">MyBook</h1>
            <h2 className="statement">
              Connect with friends and the world around you on MyBook.
            </h2>
          </div>
          <div className="login-form">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit" className="login-button">
              Log In
            </button>
            <button
              type="submit"
              className="google-login-button"
              onClick={() => googleLogIn(dispatch)}
            >
              Log In with Google
            </button>
            <div className="separator"></div>
            <button className="create-account">Create new Account</button>
          </div>
        </div>
      </div>
      <footer>
        <a href="https://github.com/liridonloku" className="footer-text">
          liridonloku, 2022
        </a>
      </footer>
    </StyledLogin>
  );
};

export default Login;
