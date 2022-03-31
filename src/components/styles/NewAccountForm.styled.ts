import styled from "styled-components";

const StyledNewAccountForm = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 2;
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    background-color: white;
    width: 90vw;
    max-width: 500px;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    label {
      color: #606770;
    }

    .error-message {
      color: red;
    }

    .sign-up,
    .confirm {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 0;
      gap: 10px;

      button {
        cursor: pointer;
        padding: 8px 60px;
        color: #fff;
        background-color: #42b72a;
        border: none;
        border-radius: 6px;
        font-size: 17px;
        font-weight: bold;
      }

      button.remove {
        cursor: pointer;
        padding: 8px 60px;
        color: #fff;
        background-color: #f21818;
        border: none;
        border-radius: 6px;
        font-size: 17px;
        font-weight: bold;
      }

      button.cancel {
        cursor: pointer;
        padding: 8px 60px;
        color: #6d6d6d;
        background-color: #f4f4f6;
        border: none;
        border-radius: 6px;
        font-size: 17px;
        font-weight: bold;
      }
    }
  }
`;

export default StyledNewAccountForm;
