import React, { useState, useRef } from "react";
import useDynamicHeight from "../helpers/useDynamicHeight";
import image from "../images/profile.jpg";
import { Send } from "styled-icons/material/";
import StyledCommentBox from "./styles/CommentBox.styled";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { sendCommentToDB } from "../app/firebase";
import { commentOnPost } from "../app/features/posts/posts";
import { Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

interface Props {
  postId: string;
}

const CommentBox: React.FC<Props> = ({ postId }) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [commentValue, setcommentValue] = useState("");
  const textRef = useRef(null);
  useDynamicHeight(textRef, commentValue);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setcommentValue(e.target.value);
  };

  const sendComment = () => {
    // Comment-box empty
    if (!commentValue) return;

    const id = uuidv4();

    // Send comment to DB
    sendCommentToDB(id, postId, user.id, commentValue);
    // Send comment to store
    dispatch(
      commentOnPost({
        postId,
        comment: {
          id,
          userId: user.id,
          date: Timestamp.now().toMillis(),
          content: commentValue,
        },
      })
    );
    // Clear input
    setcommentValue("");
  };

  return (
    <StyledCommentBox>
      <div className="image">
        <img src={user.photoUrl || image} alt="" data-testid="profile-pic" />
      </div>
      <div className="comment-input">
        <textarea
          ref={textRef}
          className="comment-content"
          rows={1}
          placeholder="Write a comment.."
          onChange={onChange}
          value={commentValue}
          data-testid="input"
        ></textarea>
        <div
          className="send-icon"
          data-testid="send-button"
          onClick={sendComment}
        >
          <Send size={24} color="#65676b" />
        </div>
      </div>
    </StyledCommentBox>
  );
};

export default CommentBox;
