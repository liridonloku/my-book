import React, { useState } from "react";
import { useDispatch } from "react-redux";
import NewAccountForm from "./NewAccountForm";
import StyledLogin from "./styles/Login.styled";
import { googleLogIn } from "../app/features/user/user";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import useLoginStatus from "../helpers/useLoginStatus";

interface Props {}

const Login: React.FC<Props> = () => {
  //Check login status
  const user = useSelector((state: RootState) => state.user);
  useLoginStatus(user);

  const [newAccountForm, setnewAccountForm] = useState(false);

  const toggleNewAccountForm = () => {
    setnewAccountForm(!newAccountForm);
  };

  const dispatch: AppDispatch = useDispatch();

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
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit" className="login-button">
              Log In
            </button>
            <button
              className="google-login-button"
              onClick={() => googleLogIn(dispatch)}
            >
              Log In with Google
            </button>
            <div className="separator"></div>
            <button
              className="create-account"
              onClick={() => {
                toggleNewAccountForm();
              }}
            >
              Create new Account
            </button>
          </form>
        </div>
      </div>
      <footer>
        <a href="https://github.com/liridonloku" className="footer-text">
          liridonloku, 2022
        </a>
      </footer>
      {newAccountForm && (
        <NewAccountForm toggleNewAccountForm={toggleNewAccountForm} />
      )}
    </StyledLogin>
  );
};

export default Login;
