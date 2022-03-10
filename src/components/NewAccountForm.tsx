import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import StyledNewAccountForm from "./styles/NewAccountForm.styled";
import { X } from "styled-icons/bootstrap";

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
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  //Set focus on first name input field after the modal opens.
  useEffect(() => {
    setFocus("firstName");
  }, [setFocus]);

  return (
    <StyledNewAccountForm>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </StyledNewAccountForm>
  );
};

export default NewAccountForm;
