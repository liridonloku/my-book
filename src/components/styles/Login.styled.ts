import styled from "styled-components";

export const StyledLogin = styled.div`
  .main {
    background-color: #f0f2f5;
    min-width: 500px;
    min-height: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    padding: 10px;
    display: flex;
  }

  .welcome {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 20px;
  }

  .logo {
    color: #1977f2;
  }

  .statement {
    max-width: 500px;
    min-width: 400px;
  }

  .login-form {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    font-size: 16px;
    padding: 10px;
    margin: 5px 0;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #dddfe2;
  }

  .login-button {
    cursor: pointer;
    margin-top: 15px;
    color: #fff;
    background-color: #1877f2;
    border: none;
    border-radius: 6px;
    font-size: 20px;
    line-height: 48px;
    width: 300px;
    margin-bottom: 20px;
  }

  .separator {
    border-bottom: 1px solid #dadde1;
    width: 100%;
  }

  .create-account {
    cursor: pointer;
    margin-top: 20px;
    padding: 0 10px;
    color: #fff;
    background-color: #42b72a;
    border: none;
    border-radius: 6px;
    font-size: 17px;
    line-height: 48px;
    width: fit-content;
  }

  footer {
    display: flex;
    justify-content: center;
  }

  footer > a {
    text-decoration: none;
    color: #8a8d91;
  }
`;
