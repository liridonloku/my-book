import React from "react";
import image from "../images/profile.jpg";
import { MoreHoriz, ThumbUp, Comment } from "styled-icons/material";
import StyledPost from "./styles/Post.styled";

interface Props {}

const Post: React.FC<Props> = () => {
  return (
    <StyledPost>
      <div className="head">
        <div className="left">
          <div className="image">
            <img src={image} alt="user" />
          </div>
          <div className="meta-data">
            <p className="user-name">User Name</p>
            <p className="post-date">Date</p>
          </div>
        </div>
        <div className="right">
          <div className="button">
            <h3>
              <MoreHoriz size={24} />
            </h3>
          </div>
        </div>
      </div>
      <div className="text">
        <p>Lorem Ipsum Dolor Sit Amet</p>
      </div>
      <div className="image">
        <img src="http://placeimg.com/640/480/any" alt="post" />
      </div>
      <div className="stats">
        <div className="likes">
          <p className="like-icon">
            <ThumbUp size={12} color="white" />
          </p>
          <p>0</p>
        </div>
        <div className="comments">
          <p>11 Comments</p>
        </div>
      </div>
      <div className="buttons">
        <div className="like">
          <h3>
            <ThumbUp size={16} />
          </h3>
          <h3>Like</h3>
        </div>
        <div className="comment">
          <h3>
            <Comment size={16} />
          </h3>
          <h3>Comment</h3>
        </div>
      </div>
      <>{/*Comments section*/}</>
    </StyledPost>
  );
};

export default Post;
