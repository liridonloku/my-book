import React from "react";
import StyledCommentSection from "./styles/CommentSection.styled";
import CommentBox from "./CommentBox";
import Comment from "./Comment";
import { CommentData } from "../app/features/posts/posts";

interface Props {
  comments: CommentData[];
}

const CommentSection: React.FC<Props> = ({ comments }) => {
  return (
    <StyledCommentSection>
      <CommentBox />
      <Comment />
    </StyledCommentSection>
  );
};

export default CommentSection;
