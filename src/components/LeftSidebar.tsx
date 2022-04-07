import React from "react";
import StyledLeftSidebar from "./styles/LeftSidebar.styled";
import image from "../images/profile.jpg";
import { People } from "@styled-icons/material/People";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";

interface Props {}

const LeftSidebar: React.FC<Props> = () => {
  const user = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  return (
    <StyledLeftSidebar>
      <div
        className="profile-link"
        onClick={() => {
          navigate(`/user/${user.id}`);
        }}
      >
        <div className="image">
          <img src={user.photoUrl || image} alt="img" />
        </div>
        <p>{user.name}</p>
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
