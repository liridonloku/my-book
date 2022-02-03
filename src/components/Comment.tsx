import React from "react";
import StyledComment from "./styles/Comment.styled";
import image from "../images/profile.jpg";

interface Props {}

const Comment: React.FC<Props> = () => {
  return (
    <StyledComment>
      <div className="image">
        <img src={image} alt="profile" data-testid="profile-pic" />
      </div>
      <div className="comment">
        <div className="comment-content">
          <p className="user-name" data-testid="user-name">
            User Name
          </p>
          <p className="comment-text" data-testid="comment-text">
            This is a comment...
          </p>
        </div>
        <div className="comment-actions">
          <p className="like" data-testid="like-button">
            Like
          </p>
          <p className="date" data-testid="date-posted">
            Date
          </p>
        </div>
      </div>
    </StyledComment>
  );
};

export default Comment;
