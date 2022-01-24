import React from "react";
import StyledHeader from "./styles/Header.styled";

type Props = {};

const Header = (props: Props) => {
  return (
    <StyledHeader>
      <div className="container">
        <div className="left">
          <div className="icon">
            <h2>M</h2>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search MyBook" />
          </div>
        </div>
        <div className="middle">
          <div className="home">
            <h3>Home</h3>
          </div>
          <div className="people">
            <h3>People</h3>
          </div>
        </div>
        <div className="right">
          <div className="user">
            <div className="imag">
              <img src="#" alt="profile" />
            </div>
            <div className="name">Name Name</div>
          </div>
          <div className="menu">
            <h3>Menu</h3>
          </div>
          <div className="messages">
            <h3>Msg</h3>
          </div>
          <div className="notifications">
            <h3>Ntf</h3>
          </div>
          <div className="settings">
            <h3>Set</h3>
          </div>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
