import React from "react";
import StyledLeftSidebar from "./styles/LeftSidebar.styled";
import image from "../images/profile.jpg";
import { People } from "@styled-icons/material/People";

interface Props {}

const LeftSidebar: React.FC<Props> = () => {
  return (
    <StyledLeftSidebar>
      <div className="profile-link">
        <div className="image">
          <img src={image} alt="user" />
        </div>
        <p className="user-name">User Name</p>
      </div>
      <div className="friends-link">
        <div className="icon">
          <People size={38} color="#1977f2" />
        </div>
        <p className="friends">Friends</p>
      </div>
    </StyledLeftSidebar>
  );
};

export default LeftSidebar;
