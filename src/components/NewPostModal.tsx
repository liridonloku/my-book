import React, { useState, useRef } from "react";
import { Image, X } from "styled-icons/bootstrap";
import StyledNewPostModal from "./styles/NewPostModal.styled";
import useDynamicHeight from "../helpers/useDynamicHeight";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import defaultImg from "../images/profile.jpg";
import { uploadPicture } from "../app/cloudinary";
import LoadingAnimation from "./LoadingAnimation";
import { addNewPostToDB } from "../app/firebase";
import { Timestamp } from "firebase/firestore";
import { addNewPost } from "../app/features/posts/posts";
import { motion } from "framer-motion";

interface Props {
  toggleNewPostModal: Function;
}

export const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const NewPostModal: React.FC<Props> = ({ toggleNewPostModal }) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [isLoading, setisLoading] = useState(false);
  const [caption, setcaption] = useState("");
  const [localImage, setlocalImage] = useState("");
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
          setlocalImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setfile(null);
    setlocalImage("");
  };

  const post = async () => {
    //Loading indicator
    setisLoading(true);

    //Upload image
    let imageUrl = "";
    if (file) {
      const imageData = await uploadPicture(file);
      imageUrl = imageData.data.secure_url;
    }

    //Add post to firebase
    const newPost = await addNewPostToDB(user.id, caption, imageUrl);

    //Get necessary post data from firebase
    const postId: string = newPost.data()?.postId;
    const date: number =
      newPost.data()?.date.toMillis() || Timestamp.now().toMillis();

    //Add post to redux store
    dispatch(
      addNewPost({
        postId,
        userId: user.id,
        date,
        caption,
        image: imageUrl,
        likes: [],
        comments: [],
      })
    );

    //Stop loading indicator
    setisLoading(false);
    toggleNewPostModal();
  };

  return (
    <StyledNewPostModal>
      <motion.div
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
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
          {localImage && (
            <div className="post-image">
              <img src={localImage} alt="" />
              <div className="remove-image" onClick={removeImage}>
                <X size={24} color={"grey"} />
              </div>
            </div>
          )}
          {!localImage && (
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
      </motion.div>
    </StyledNewPostModal>
  );
};

export default NewPostModal;
