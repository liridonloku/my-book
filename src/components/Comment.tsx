import React from "react";
import StyledComment from "./styles/Comment.styled";
import image from "../images/profile.jpg";

interface Props {}

const Comment: React.FC<Props> = () => {
  return (
    <StyledComment>
      <div className="image">
        <img src={image} alt="profile" />
      </div>
      <div className="comment">
        <div className="comment-content">
          <p className="user-name">User Name</p>
          <p className="comment-text">This is a comment...</p>
        </div>
        <div className="comment-actions">
          <p className="like">Like</p>
          <p className="date">Date</p>
        </div>
      </div>
    </StyledComment>
  );
};

export default Comment;
