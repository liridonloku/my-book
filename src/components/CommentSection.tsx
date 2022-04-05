import React from "react";
import StyledCommentSection from "./styles/CommentSection.styled";
import CommentBox from "./CommentBox";
import Comment from "./Comment";
import { CommentData } from "../app/features/posts/posts";

interface Props {
  comments: CommentData[];
  postId: string;
}

const CommentSection: React.FC<Props> = ({ comments, postId }) => {
  const displayComments = () => {
    return comments.map((comment) => {
      return <Comment comment={comment} />;
    });
  };
  return (
    <StyledCommentSection>
      <CommentBox postId={postId} />
      {displayComments()}
    </StyledCommentSection>
  );
};

export default CommentSection;
