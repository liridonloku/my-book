import React, { useState, useRef } from "react";
import { Image, X } from "styled-icons/bootstrap";
import StyledNewPostModal from "./styles/NewPostModal.styled";
import useDynamicHeight from "../helpers/useDynamicHeight";
import { useAppSelector } from "../app/hooks";
import defaultImg from "../images/profile.jpg";
import { uploadPicture } from "../app/cloudinary";
import LoadingAnimation from "./LoadingAnimation";

interface Props {
  toggleNewPostModal: Function;
}

const NewPostModal: React.FC<Props> = ({ toggleNewPostModal }) => {
  const user = useAppSelector((state) => state.user);
  const [isLoading, setisLoading] = useState(false);
  const [caption, setcaption] = useState("");
  const [image, setimage] = useState("");
  const [file, setfile] = useState<null | File>(null);

  //Growing text-box
  const textRef = useRef(null);
  useDynamicHeight(textRef, caption);

  const onCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setcaption(e.target.value);
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      setfile(file);
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setimage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setfile(null);
    setimage("");
  };

  const post = async () => {
    setisLoading(true);
    if (file) {
      await uploadPicture(file);
    }
    setisLoading(false);
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
              onChange={onCaptionChange}
              value={caption}
            ></textarea>
          </div>
          {image && (
            <div className="post-image">
              <img src={image} alt="" />
              <div className="remove-image" onClick={removeImage}>
                <X size={24} color={"grey"} />
              </div>
            </div>
          )}
          {!image && (
            <div className="add-image">
              <input
                type="file"
                name="file"
                id="file"
                accept="image/*"
                onChange={(e) => {
                  onImageChange(e);
                }}
              />
              <label htmlFor="file">
                <Image size={24} color={"green"} />
                Add image
              </label>
            </div>
          )}
        </div>
        <div className="submit">
          <button onClick={post} disabled={isLoading}>
            {isLoading ? <LoadingAnimation /> : "Post"}
          </button>
        </div>
      </div>
    </StyledNewPostModal>
  );
};

export default NewPostModal;
