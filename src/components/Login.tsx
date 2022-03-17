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
    try {
      await logInWithEmail(Object(data));
    } catch (error: any) {
      switch (error.code) {
        case "auth/wrong-password":
          seterror("Wrong password");
          break;
        case "auth/user-not-found":
          seterror("There is no account registered with this email.");
          break;
        case "auth/too-many-requests":
          seterror(
            "Access to this account has been disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
          );
          break;
        default:
          seterror("Unexpected error ocurred. Try again later.");
      }
    }
  };

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const [newAccountForm, setnewAccountForm] = useState(false);

  const [error, seterror] = useState("");

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
                onChange: () => {
                  if (error !== "") {
                    seterror("");
                  }
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
            {error && <p className="error-message">{error}</p>}
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
