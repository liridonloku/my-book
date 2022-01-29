import React from "react";
import StyledCommentSection from "./styles/CommentSection.styled";
import image from "../images/profile.jpg";
import { Send } from "styled-icons/material/";

interface Props {}

const CommentSection: React.FC<Props> = () => {
  return (
    <StyledCommentSection>
      <div className="comment-box">
        <div className="image">
          <img src={image} alt="" />
        </div>
        <div className="comment-input">
          {/* TODO: Find a better solution for the comment box */}
          <div
            className="comment-content"
            contentEditable="true"
            placeholder="Write a comment.."
          ></div>
          <div className="send-icon">
            <Send size={24} color="#65676b" />
          </div>
        </div>
      </div>
    </StyledCommentSection>
  );
};

export default CommentSection;
