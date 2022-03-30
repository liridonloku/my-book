import React from "react";
import StyledNewPost from "./styles/NewPost.styled";
import image from "../images/profile.jpg";
import { Videocam, Photo, EmojiEmotions } from "styled-icons/material";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface Props {}

const NewPost: React.FC<Props> = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <StyledNewPost>
      <div className="top">
        <div className="image">
          <img src={user.photoUrl || image} alt="profile" />
        </div>
        <div className="form">What's on your mind?</div>
      </div>
      <div className="separator"></div>
      <div className="bottom">
        <div className="video-post">
          <Videocam size={24} color="red" />
          <p>Live Video</p>
        </div>
        <div className="photo-post">
          <Photo size={24} color="green" />
          <p>Photo</p>
        </div>
        <div className="feeling-post">
          <EmojiEmotions size={24} color="orange" />
          <p>Feeling</p>
        </div>
      </div>
    </StyledNewPost>
  );
};

export default NewPost;
