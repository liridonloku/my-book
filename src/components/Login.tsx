import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import NewAccountForm from "./NewAccountForm";
import StyledLogin from "./styles/Login.styled";
import { logInWithEmail, logInWithGoogle } from "../app/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import useLoginStatus from "../helpers/useLoginStatus";

interface Props {}

interface IFormInput {
  email: string;
  password: string;
}

const Login: React.FC<Props> = () => {
  //Check login status
  const user = useSelector((state: RootState) => state.user);
  useLoginStatus(user);

  const {
    register,
    handleSubmit,
    trigger,
    setFocus,
    formState: { errors },
  } = useForm<IFormInput>({
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    logInWithEmail(Object(data));
  };

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const [newAccountForm, setnewAccountForm] = useState(false);

  const toggleNewAccountForm = () => {
    setnewAccountForm(!newAccountForm);
  };

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
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Please type your email",
                pattern: {
                  value:
                    // eslint-disable-next-line no-useless-escape
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please type a valid email",
                },
                onBlur: () => {
                  trigger("email");
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type} className="error-message">
                    {message}
                  </p>
                ))
              }
            />
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Please type your password",
                onBlur: () => {
                  trigger("password");
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type} className="error-message">
                    {message}
                  </p>
                ))
              }
            />
            <button type="submit" className="login-button">
              Log In
            </button>
            <button
              className="google-login-button"
              onClick={() => logInWithGoogle()}
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
