import React from "react";
import StyledComment from "./styles/Comment.styled";
import image from "../images/profile.jpg";
import { CommentData } from "../app/features/posts/posts";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import calculateTime from "../helpers/calculateTime";
import { Delete } from "styled-icons/fluentui-system-regular";
import { deleteCommentFromDB } from "../app/firebase";
import { deleteComment as deleteCommentFromStore } from "../app/features/posts/posts";
import { useNavigate } from "react-router-dom";

interface Props {
  comment: CommentData;
  postId: string;
}

const Comment: React.FC<Props> = ({ comment, postId }) => {
  const user = useAppSelector((state) => state.user);
  const people = useAppSelector((state) => state.people.data);
  const person = people.find((person) => person.id === comment.userId);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteComment = () => {
    // Delete from database
    deleteCommentFromDB(postId, comment.id);
    // Delete from store
    dispatch(deleteCommentFromStore({ postId, commentId: comment.id }));
  };
  return (
    <StyledComment>
      <div
        className="image"
        onClick={() => {
          navigate(`/user/${person?.id}`);
        }}
      >
        <img
          src={person?.photoUrl || image}
          alt="profile"
          data-testid="profile-pic"
        />
      </div>
      <div className="comment">
        <div className="comment-content">
          <p
            className="user-name"
            data-testid="user-name"
            onClick={() => {
              navigate(`/user/${person?.id}`);
            }}
          >
            {person?.name || "User Name"}
          </p>
          <p className="comment-text" data-testid="comment-text">
            {comment.content}
          </p>
        </div>
        <div className="comment-actions">
          <p className="date" data-testid="date-posted">
            {calculateTime(new Date(comment.date), new Date(Date.now()))}
          </p>
        </div>
        {comment.userId === user.id && (
          <div className="delete-comment" onClick={deleteComment}>
            <Delete size={24} />
          </div>
        )}
      </div>
    </StyledComment>
  );
};

export default Comment;
