import React from "react";
import StyledLeftSidebar from "./styles/LeftSidebar.styled";
import image from "../images/profile.jpg";
import { People } from "@styled-icons/material/People";
import { useAppSelector } from "../app/hooks";

interface Props {}

const LeftSidebar: React.FC<Props> = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <StyledLeftSidebar>
      <div className="profile-link">
        <div className="image">
          <img src={user.photoUrl || image} alt="img" />
        </div>
        <p className="user-name">{user.name}</p>
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
