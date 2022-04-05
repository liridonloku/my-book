import React from "react";
import StyledComment from "./styles/Comment.styled";
import image from "../images/profile.jpg";
import { CommentData } from "../app/features/posts/posts";
import { useAppSelector } from "../app/hooks";
import calculateTime from "../helpers/calculateTime";

interface Props {
  comment: CommentData;
}

const Comment: React.FC<Props> = ({ comment }) => {
  const people = useAppSelector((state) => state.people.data);
  const user = useAppSelector((state) => state.user);
  const person = people.find((person) => person.id === comment.userId);
  return (
    <StyledComment>
      <div className="image">
        <img
          src={person?.photoUrl || image}
          alt="profile"
          data-testid="profile-pic"
        />
      </div>
      <div className="comment">
        <div className="comment-content">
          <p className="user-name" data-testid="user-name">
            {person?.name || "User Name"}
          </p>
          <p className="comment-text" data-testid="comment-text">
            {comment.content}
          </p>
        </div>
        <div className="comment-actions">
          <p
            className="like"
            data-testid="like-button"
            style={comment.likes.includes(user.id) ? { color: "#1977f2" } : {}}
          >
            {comment.likes.includes(user.id) ? "Unlike" : "Like"}
          </p>
          <p className="date" data-testid="date-posted">
            {calculateTime(new Date(comment.date), new Date(Date.now()))}
          </p>
        </div>
      </div>
    </StyledComment>
  );
};

export default Comment;
