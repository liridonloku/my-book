import React from "react";
import StyledNewAccountForm from "./styles/NewAccountForm.styled";

interface Props {
  toggleInformationBox: Function;
}

const InformationBox: React.FC<Props> = ({ toggleInformationBox }) => {
  return (
    <StyledNewAccountForm>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toggleInformationBox();
        }}
      >
        <div className="top">
          <h3 className="title">Reset password</h3>
        </div>
        <div className="information">
          <p>
            Password reset email has been sent. Please check your email to reset
            your password.
          </p>
        </div>
        <div className="confirm">
          <button type="submit">Ok</button>
        </div>
      </form>
    </StyledNewAccountForm>
  );
};

export default InformationBox;
