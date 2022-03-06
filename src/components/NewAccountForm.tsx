import React from "react";
import StyledNewAccountForm from "./styles/NewAccountForm.styled";
import { X } from "styled-icons/bootstrap";

interface Props {}

const NewAccountForm: React.FC<Props> = () => {
  return (
    <StyledNewAccountForm>
      <form>
        <div className="top">
          <h3 className="title">Sign Up</h3>
          <div className="close-button">
            <X size={24} />
          </div>
        </div>
        <div className="information">
          <label htmlFor="first-name">First Name</label>
          <input type="text" name="first-name" />
          <label htmlFor="last-name">Last Name</label>
          <input type="text" name="last-name" />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <label htmlFor="confirm-password">Confirm password</label>
          <input type="password" name="confirm-password" />
        </div>
        <div className="sign-up">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </StyledNewAccountForm>
  );
};

export default NewAccountForm;
