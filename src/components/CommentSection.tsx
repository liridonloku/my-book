import React, { useState, useRef } from "react";
import StyledCommentSection from "./styles/CommentSection.styled";
import image from "../images/profile.jpg";
import { Send } from "styled-icons/material/";
import useDynamicHeight from "../helpers/useDynamicHeight";

interface Props {}

const CommentSection: React.FC<Props> = () => {
  const [commentValue, setcommentValue] = useState("");
  const textRef = useRef(null);
  useDynamicHeight(textRef, commentValue);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setcommentValue(e.target.value);
  };

  return (
    <StyledCommentSection>
      <div className="comment-box">
        <div className="image">
          <img src={image} alt="" />
        </div>
        <div className="comment-input">
          {/* TODO: Find a better solution for the comment box */}
          <textarea
            ref={textRef}
            className="comment-content"
            placeholder="Write a comment.."
            onChange={onChange}
            value={commentValue}
          ></textarea>
          <div className="send-icon">
            <Send size={24} color="#65676b" />
          </div>
        </div>
      </div>
    </StyledCommentSection>
  );
};

export default CommentSection;
