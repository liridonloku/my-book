import React, { useEffect, useState } from "react";
import StyledNewAccountForm from "./styles/NewAccountForm.styled";
import { X } from "styled-icons/bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { sendResetPasswordLink } from "../app/firebase";

interface Props {
  toggleResetPasswordForm: Function;
  toggleInformationBox: Function;
}

interface IFormInput {
  email: string;
}

const ResetPasswordForm: React.FC<Props> = ({
  toggleResetPasswordForm,
  toggleInformationBox,
}) => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<IFormInput>({
    criteriaMode: "all",
  });

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const [errorMessage, seterrorMessage] = useState("");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await sendResetPasswordLink(data.email);
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        seterrorMessage("There is no account registered with this email.");
      } else {
        seterrorMessage("Unexpected error. Please try again later.");
      }
      return;
    }
    toggleResetPasswordForm();
    toggleInformationBox();
  };

  return (
    <StyledNewAccountForm>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="top">
          <h3 className="title">Reset password</h3>
          <div
            className="close-button"
            onClick={() => {
              toggleResetPasswordForm();
            }}
          >
            <X size={24} />
          </div>
        </div>
        <div className="information">
          <input
            type="email"
            placeholder="email"
            {...register("email", {
              required: "Please type your email",
              pattern: {
                value:
                  // eslint-disable-next-line no-useless-escape
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please provide a valid email",
              },
              onChange: () => {
                if (errorMessage !== "") {
                  seterrorMessage("");
                }
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <div className="sign-up">
          <button type="submit">Send password reset email</button>
        </div>
      </form>
    </StyledNewAccountForm>
  );
};

export default ResetPasswordForm;
