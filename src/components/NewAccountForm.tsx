import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import StyledNewAccountForm from "./styles/NewAccountForm.styled";
import { createNewAccount } from "../app/firebase";
import { X } from "styled-icons/bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { dropIn } from "./NewPostModal";
import LoadingAnimation from "./LoadingAnimation";

interface Props {
  toggleNewAccountForm: Function;
}

interface IFormInput {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  confirmPassword: String;
}

const NewAccountForm: React.FC<Props> = ({ toggleNewAccountForm }) => {
  let navigate = useNavigate();

  let dispatch = useDispatch();

  const [error, seterror] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    setFocus,
    getValues,
    formState: { errors },
  } = useForm<IFormInput>({
    criteriaMode: "all",
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setisLoading(true);
    try {
      const userCredential = await createNewAccount(Object(data), dispatch);
      if (userCredential) {
        navigate("/", { replace: true });
      }
    } catch (error: any) {
      setisLoading(false);
      if (error.code === "auth/email-already-in-use") {
        seterror(
          "This email is already linked to an account. Please use another email."
        );
      } else {
        seterror("Unexpected error ocurred. Please try again later.");
      }
    }
  };

  //Set focus on first name input field after the modal opens.
  useEffect(() => {
    setFocus("firstName");
  }, [setFocus]);

  return (
    <StyledNewAccountForm>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="top">
          <h3 className="title">Sign Up</h3>
          <div
            className="close-button"
            onClick={() => {
              toggleNewAccountForm();
            }}
          >
            <X size={24} />
          </div>
        </div>
        <div className="information">
          {error && (
            <p className="error-message" style={{ marginBottom: "10px" }}>
              {error}
            </p>
          )}
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            {...register("firstName", {
              required: "Please fill your first name.",
              maxLength: {
                value: 20,
                message: "First name must be less than 20 characters long.",
              },
              onBlur: () => {
                trigger("firstName");
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="firstName"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p key={type} className="error-message">
                  {message}
                </p>
              ))
            }
          />
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            {...register("lastName", {
              required: "Please fill your last name.",
              maxLength: {
                value: 20,
                message: "Last name must be less than 20 characters long.",
              },
              onBlur: () => {
                trigger("lastName");
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="lastName"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p key={type} className="error-message">
                  {message}
                </p>
              ))
            }
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Please fill your email",
              pattern: {
                value:
                  // eslint-disable-next-line no-useless-escape
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please provide a valid email",
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Please type a passowrd",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
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
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm password",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
              validate: {
                matchesPassword: (value) => {
                  return value === getValues("password")
                    ? true
                    : "Passwords don't match";
                },
              },
              onBlur: () => {
                trigger("confirmPassword");
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="confirmPassword"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p key={type} className="error-message">
                  {message}
                </p>
              ))
            }
          />
        </div>
        <div className="sign-up">
          <button type="submit" disabled={isLoading}>
            {isLoading ? <LoadingAnimation /> : "Sign Up"}
          </button>
        </div>
      </motion.form>
    </StyledNewAccountForm>
  );
};

export default NewAccountForm;
