import React, { useState } from "react";
import StyledNewPost from "./styles/NewPost.styled";
import image from "../images/profile.jpg";
import { Videocam, Photo, EmojiEmotions } from "styled-icons/material";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import NewPostModal from "./NewPostModal";

interface Props {}

const NewPost: React.FC<Props> = () => {
  const user = useSelector((state: RootState) => state.user);

  const [newPostModal, setnewPostModal] = useState(false);

  const toggleNewPostModal = () => {
    setnewPostModal(!newPostModal);
  };

  return (
    <StyledNewPost>
      <div className="top">
        <div className="image">
          <img src={user.photoUrl || image} alt="profile" />
        </div>
        <div className="form" onClick={toggleNewPostModal}>
          What's on your mind, {user.name.slice(0, user.name.indexOf(" "))}?
        </div>
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
      {newPostModal && <NewPostModal toggleNewPostModal={toggleNewPostModal} />}
    </StyledNewPost>
  );
};

export default NewPost;
