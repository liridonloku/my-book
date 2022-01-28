import React from "react";
import StyledLogin from "./styles/Login.styled";

interface Props {}

const Login: React.FC<Props> = () => {
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
          <div className="login-form">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit" className="login-button">
              Log In
            </button>
            <div className="separator"></div>
            <button className="create-account">Create new Account</button>
          </div>
        </div>
      </div>
      <footer>
        <a href="https://github.com/liridonloku" className="footer-text">
          liridonloku, 2022
        </a>
      </footer>
    </StyledLogin>
  );
};

export default Login;
