import React from "react";
import StyledCommentSection from "./styles/CommentSection.styled";
import CommentBox from "./CommentBox";
import Comment from "./Comment";

interface Props {}

const CommentSection: React.FC<Props> = () => {
  return (
    <StyledCommentSection>
      <CommentBox />
      <Comment />
      <Comment />
      <Comment />
    </StyledCommentSection>
  );
};

export default CommentSection;
