import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import NewAccountForm from "./NewAccountForm";
import InformationBox from "./InformationBox";
import StyledLogin from "./styles/Login.styled";
import { logInWithEmail, logInWithGoogle } from "../app/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import useLoginStatus from "../helpers/useLoginStatus";
import ResetPasswordForm from "./ResetPasswordForm";

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
          seterror("Unexpected error ocurred. Please try again later.");
      }
    }
  };

  const demoLogin = async () => {
    try {
      await logInWithEmail(
        Object({ email: "email1@example.com", password: "123456" })
      );
    } catch (error: any) {
      seterror(error.code);
    }
  };

  const [newAccountForm, setnewAccountForm] = useState(false);
  const [resetPasswordForm, setresetPasswordForm] = useState(false);
  const [informationBox, setinformationBox] = useState(false);

  const [error, seterror] = useState("");

  const toggleNewAccountForm = () => {
    setnewAccountForm(!newAccountForm);
  };

  const toggleResetPasswordForm = () => {
    setresetPasswordForm(!resetPasswordForm);
  };

  const toggleInformationBox = () => {
    setinformationBox(!informationBox);
  };

  return (
    <StyledLogin>
      <div className="main">
        <div className="container">
          <div className="welcome">
            <h1 className="logo">MyBook</h1>
            <h2 className="statement">The ultimate social network.</h2>
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
            <button
              type="button"
              className="reset-password"
              onClick={(e) => {
                e.preventDefault();
                toggleResetPasswordForm();
              }}
            >
              Reset password
            </button>
            <button type="submit" className="login-button">
              Log In
            </button>
            <button
              type="button"
              className="google-login-button"
              onClick={() => logInWithGoogle()}
            >
              Log In with Google
            </button>
            <button
              type="button"
              className="demo-login-button"
              onClick={() => demoLogin()}
            >
              Demo Account
            </button>
            <div className="separator"></div>
            <button
              type="button"
              className="create-account"
              onClick={(e) => {
                e.preventDefault();
                toggleNewAccountForm();
              }}
            >
              Create new Account
            </button>
          </form>
        </div>
      </div>
      <footer>
        <p>
          <a href="https://github.com/liridonloku" className="footer-text">
            liridonloku, 2022
          </a>
        </p>
        <p className="disclaimer">
          Disclaimer: This app is made as an exercise and is not a real product.
          Do not post sensitive personal information.
        </p>
      </footer>
      {newAccountForm && (
        <NewAccountForm toggleNewAccountForm={toggleNewAccountForm} />
      )}
      {resetPasswordForm && (
        <ResetPasswordForm
          toggleResetPasswordForm={toggleResetPasswordForm}
          toggleInformationBox={toggleInformationBox}
        />
      )}
      {informationBox && (
        <InformationBox toggleInformationBox={toggleInformationBox} />
      )}
    </StyledLogin>
  );
};

export default Login;
