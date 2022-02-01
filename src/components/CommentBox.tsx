import React, { useState, useRef } from "react";
import useDynamicHeight from "../helpers/useDynamicHeight";
import image from "../images/profile.jpg";
import { Send } from "styled-icons/material/";
import StyledCommentBox from "./styles/CommentBox.styled";

interface Props {}

const CommentBox: React.FC<Props> = () => {
  const [commentValue, setcommentValue] = useState("");
  const textRef = useRef(null);
  useDynamicHeight(textRef, commentValue);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setcommentValue(e.target.value);
  };

  return (
    <StyledCommentBox>
      <div className="image">
        <img src={image} alt="" />
      </div>
      <div className="comment-input">
        <textarea
          ref={textRef}
          className="comment-content"
          rows={1}
          placeholder="Write a comment.."
          onChange={onChange}
          value={commentValue}
        ></textarea>
        <div className="send-icon">
          <Send size={24} color="#65676b" />
        </div>
      </div>
    </StyledCommentBox>
  );
};

export default CommentBox;
