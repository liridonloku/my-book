import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

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
          <label htmlFor="first-name">First Name</label>
          <input type="text" {...register("firstName")} />
          <label htmlFor="last-name">Last Name</label>
          <input type="text" {...register("lastName")} />
          <label htmlFor="email">Email</label>
          <input type="email" {...register("email")} />
          <label htmlFor="password">Password</label>
          <input type="password" {...register("password")} />
          <label htmlFor="confirm-password">Confirm password</label>
          <input type="password" {...register("confirmPassword")} />
        </div>
        <div className="sign-up">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </StyledNewAccountForm>
  );
};

export default NewAccountForm;
