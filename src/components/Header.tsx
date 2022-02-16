import React from "react";
import StyledHeader from "./styles/Header.styled";
import { Home } from "@styled-icons/material/Home";
import { People } from "@styled-icons/material/People";
import { Apps } from "@styled-icons/material/Apps";
import { Inbox } from "@styled-icons/material/Inbox";
import { Notifications } from "@styled-icons/material/Notifications";
import { ArrowDropDown } from "@styled-icons/material/ArrowDropDown";
import profile from "../images/profile.jpg";
import { logout } from "../app/features/user/userSlice";
import { useDispatch } from "react-redux";

interface Props {
  user?: {};
}

const Header: React.FC<Props> = () => {
  //This needs to be moved to userSlice
  const dispatch = useDispatch();
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
            <h3>
              <Home size={24} data-testid="home" />
            </h3>
          </div>
          <div className="people">
            <h3>
              <People size={24} data-testid="people" />
            </h3>
          </div>
        </div>
        <div className="right">
          <div className="user">
            <div className="image">
              <img src={profile} alt="profile" />
            </div>
            <div className="name">Name</div>
          </div>
          <div className="right-nav">
            <div className="menu">
              <h3>
                <Apps size={24} />
              </h3>
            </div>
            <div className="messages">
              <h3>
                <Inbox size={24} />
              </h3>
            </div>
            <div className="notifications">
              <h3>
                <Notifications size={24} />
              </h3>
            </div>
            <div className="settings">
              <h3>
                <ArrowDropDown size={24} onClick={() => dispatch(logout())} />
              </h3>
            </div>
          </div>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
