import React from "react";
import StyledCommentSection from "./styles/CommentSection.styled";
import CommentBox from "./CommentBox";
import Comment from "./Comment";
import { CommentData } from "../app/features/posts/posts";

interface Props {
  comments: CommentData[];
  postId: string;
  showComments: boolean;
  showAll: boolean;
}

const CommentSection: React.FC<Props> = ({
  comments,
  postId,
  showComments,
  showAll,
}) => {
  const displayComments = () => {
    if (!showComments) return;
    if (showComments && showAll) {
      return comments.map((comment) => {
        return <Comment key={comment.id} comment={comment} postId={postId} />;
      });
    }
    if (showComments && !showAll) {
      //Show only last 3 comments
      return comments.slice(0, 3).map((comment) => {
        return <Comment key={comment.id} comment={comment} postId={postId} />;
      });
    }
    return comments.map((comment) => {
      return <Comment key={comment.id} comment={comment} postId={postId} />;
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
