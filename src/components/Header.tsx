import React from "react";
import StyledHeader from "./styles/Header.styled";
import {
  Home,
  People,
  Apps,
  Inbox,
  Notifications,
  ArrowDropDown,
} from "@styled-icons/material";
import profile from "../images/profile.jpg";
import { logOutUser } from "../app/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Link } from "react-router-dom";

interface Props {}

const Header: React.FC<Props> = () => {
  const user = useSelector((state: RootState) => state.user);

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
              <Link to={"/"}>
                <Home size={24} data-testid="home" />
              </Link>
            </h3>
          </div>
          <div className="people">
            <h3>
              <Link to={"/people"}>
                <People size={24} data-testid="people" />
              </Link>
            </h3>
          </div>
        </div>
        <div className="right">
          <div className="user">
            <div className="image">
              <img
                referrerPolicy="no-referrer"
                src={user.photoUrl !== "" ? user.photoUrl : profile}
                alt="profile"
              />
            </div>
            <div className="name">{user.name}</div>
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
                <ArrowDropDown size={24} onClick={() => logOutUser()} />
              </h3>
            </div>
          </div>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
