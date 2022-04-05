import React from "react";
import image from "../images/profile.jpg";
import { MoreHoriz, ThumbUp, Comment } from "styled-icons/material";
import StyledPost from "./styles/Post.styled";
import CommentSection from "./CommentSection";
import { PostData } from "../app/features/posts/posts";
import { useAppSelector } from "../app/hooks";
import calculateTime from "../helpers/calculateTime";

interface Props {
  post: PostData;
}

const Post: React.FC<Props> = ({ post }) => {
  const user = useAppSelector((state) => state.user);
  const people = useAppSelector((state) => state.people.data);
  const person = people.find((person) => person.id === post.userId);
  return (
    <StyledPost>
      <div className="head">
        <div className="left">
          <div className="image">
            <img
              src={person?.photoUrl || image}
              alt="user"
              data-testid="user-image"
            />
          </div>
          <div className="meta-data">
            <p className="user-name" data-testid="user-name">
              {person?.name || "User Name"}
            </p>
            <p className="post-date" data-testid="post-date">
              {calculateTime(new Date(post.date), new Date(Date.now()))}
            </p>
          </div>
        </div>
        <div className="right">
          <div className="button">
            <h3 data-testid="more-button">
              <MoreHoriz size={24} />
            </h3>
          </div>
        </div>
      </div>
      <div className="text">
        <p>{post.caption}</p>
      </div>
      {post.image && (
        <div className="image">
          <img src={post.image} alt="post" loading="lazy" />
        </div>
      )}
      <div className="stats">
        <div className="likes">
          <p className="like-icon" data-testid="like-icon">
            <ThumbUp size={12} color="white" />
          </p>
          <p data-testid="likes">{post.likes.length}</p>
        </div>
        <div className="comments">
          <p data-testid="comments">{post.comments.length} comments</p>
        </div>
      </div>
      <div className="buttons">
        <div
          className="like"
          data-testid="like-button"
          style={post.likes.includes(user.id) ? { color: "#1977f2" } : {}}
        >
          <h3>
            <ThumbUp size={16} />
          </h3>
          <h3>Like</h3>
        </div>
        <div className="comment" data-testid="comment-button">
          <h3>
            <Comment size={16} />
          </h3>
          <h3>Comment</h3>
        </div>
      </div>
      <CommentSection comments={post.comments} postId={post.postId} />
    </StyledPost>
  );
};

export default Post;
