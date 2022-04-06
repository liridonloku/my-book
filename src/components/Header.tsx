import React, { useState } from "react";
import StyledHeader from "./styles/Header.styled";
import {
  Home,
  People,
  Apps,
  Inbox,
  Notifications,
  ArrowDropDown,
  Logout,
} from "@styled-icons/material";
import profile from "../images/profile.jpg";
import { logOutUser } from "../app/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { resetStateFriendRequests } from "../app/features/friendRequests/friendRequests";
import { resetStateFriends } from "../app/features/friends/friends";
import { resetStatePeople } from "../app/features/people/people";
import { resetStatePosts } from "../app/features/posts/posts";
import { CircleSlash } from "styled-icons/octicons";

interface Props {}

const Header: React.FC<Props> = () => {
  const user = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [userMenu, setuserMenu] = useState(false);

  const toggleUserMenu = () => {
    setuserMenu(!userMenu);
  };

  const logOut = () => {
    toggleUserMenu();
    logOutUser();
    dispatch(resetStateFriendRequests());
    dispatch(resetStateFriends());
    dispatch(resetStatePeople());
    dispatch(resetStatePosts());
  };

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
          <Link to={"/"}>
            <div
              className="home"
              style={
                location.pathname === "/home"
                  ? { borderBottom: "2px solid #1977f2", borderRadius: "0" }
                  : {}
              }
            >
              <h3>
                <Home
                  size={24}
                  data-testid="home"
                  style={
                    location.pathname === "/home" ? { color: "#1977f2" } : {}
                  }
                />
              </h3>
            </div>
          </Link>
          <Link to={"/people"}>
            <div
              className="people"
              style={
                location.pathname === "/people"
                  ? { borderBottom: "2px solid #1977f2", borderRadius: "0" }
                  : {}
              }
            >
              <h3>
                <People
                  size={24}
                  data-testid="people"
                  style={
                    location.pathname === "/people" ? { color: "#1977f2" } : {}
                  }
                />
              </h3>
            </div>
          </Link>
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
              <div className="not-available">
                <CircleSlash size={16} color={"red"} />
              </div>
            </div>
            <div className="messages">
              <h3>
                <Inbox size={24} />
              </h3>
              <div className="not-available">
                <CircleSlash size={16} color={"red"} />
              </div>
            </div>
            <div className="notifications">
              <h3>
                <Notifications size={24} />
              </h3>
              <div className="not-available">
                <CircleSlash size={16} color={"red"} />
              </div>
            </div>
            <div
              className="settings"
              style={userMenu ? { backgroundColor: "#d0d3dc" } : {}}
            >
              <h3>
                <ArrowDropDown size={24} onClick={toggleUserMenu} />
              </h3>
              {userMenu && (
                <div className="user-menu">
                  <button className="log-out" onClick={logOut}>
                    <Logout size={24} />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
