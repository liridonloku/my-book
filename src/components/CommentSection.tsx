import React from "react";
import StyledCommentSection from "./styles/CommentSection.styled";
import CommentBox from "./CommentBox";

interface Props {}

const CommentSection: React.FC<Props> = () => {
  return (
    <StyledCommentSection>
      <CommentBox />
    </StyledCommentSection>
  );
};

export default CommentSection;
