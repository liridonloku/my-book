import React, { useState, useRef } from "react";
import { Image, X } from "styled-icons/bootstrap";
import StyledNewPostModal from "./styles/NewPostModal.styled";
import useDynamicHeight from "../helpers/useDynamicHeight";
import { useAppSelector } from "../app/hooks";
import defaultImg from "../images/profile.jpg";

interface Props {
  toggleNewPostModal: Function;
}

const NewPostModal: React.FC<Props> = ({ toggleNewPostModal }) => {
  const user = useAppSelector((state) => state.user);
  const [caption, setcaption] = useState("");
  const [image, setimage] = useState("");

  //Growing text-box
  const textRef = useRef(null);
  useDynamicHeight(textRef, caption);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setcaption(e.target.value);
  };

  return (
    <StyledNewPostModal>
      <div className="modal">
        <div className="top-part">
          <h3 className="title">Create post</h3>
          <div className="close-button" onClick={() => toggleNewPostModal()}>
            <X size={32} color={"grey"} />
          </div>
        </div>
        <div className="content">
          <div className="user-info">
            <div className="image">
              <img src={user.photoUrl || defaultImg} alt="img" />
            </div>
            <p>{user.name}</p>
          </div>
          <div className="caption-container">
            <textarea
              ref={textRef}
              className="caption"
              rows={3}
              placeholder="What's on your mind?"
              onChange={onChange}
              value={caption}
            ></textarea>
          </div>
          {image && (
            <div className="post-image">
              <img src={image} alt="" />
            </div>
          )}
          {!image && (
            <div className="add-image">
              <button>
                <Image size={24} color={"green"} />
                Add image
              </button>
            </div>
          )}
        </div>
        <div className="submit">
          <button>Post</button>
        </div>
      </div>
    </StyledNewPostModal>
  );
};

export default NewPostModal;
