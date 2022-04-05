import React, { useState, useRef } from "react";
import useDynamicHeight from "../helpers/useDynamicHeight";
import image from "../images/profile.jpg";
import { Send } from "styled-icons/material/";
import StyledCommentBox from "./styles/CommentBox.styled";
import { useAppSelector } from "../app/hooks";

interface Props {}

const CommentBox: React.FC<Props> = () => {
  const user = useAppSelector((state) => state.user);
  const [commentValue, setcommentValue] = useState("");
  const textRef = useRef(null);
  useDynamicHeight(textRef, commentValue);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setcommentValue(e.target.value);
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
        <div className="send-icon" data-testid="send-button">
          <Send size={24} color="#65676b" />
        </div>
      </div>
    </StyledCommentBox>
  );
};

export default CommentBox;
