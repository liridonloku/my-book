import React, { useState } from "react";
import image from "../images/profile.jpg";
import { MoreHoriz, ThumbUp, Comment } from "styled-icons/material";
import StyledPost from "./styles/Post.styled";
import CommentSection from "./CommentSection";
import { PostData, unlikePost } from "../app/features/posts/posts";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import calculateTime from "../helpers/calculateTime";
import {
  deletePostFromDB,
  likePostInDB,
  unlikePostInDB,
} from "../app/firebase";
import {
  likePost as likePostInStore,
  deletePost as deletePostInStore,
} from "../app/features/posts/posts";
import { useNavigate } from "react-router-dom";
import LikesViewer from "./LikesViewer";
import { AnimatePresence } from "framer-motion";

interface Props {
  post: PostData;
}

const Post: React.FC<Props> = ({ post }) => {
  const user = useAppSelector((state) => state.user);
  const people = useAppSelector((state) => state.people.data);
  const person = people.find((person) => person.id === post.userId);

  const [postMenu, setpostMenu] = useState(false);

  const [showLikes, setshowLikes] = useState(false);

  const toggleShowLikes = () => {
    setshowLikes((previous) => !previous);
  };

  const [showComments, setshowComments] = useState(true);
  const [showAll, setshowAll] = useState(false);

  const toggleComments = () => {
    setshowComments((previous) => !previous);
  };

  const toggleShowAllComments = () => {
    setshowAll((previous) => !previous);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleLikeOnPost = () => {
    if (post.likes.includes(user.id)) {
      //Post is already liked
      unlikePostInDB(post.postId, user.id);
      dispatch(unlikePost({ postId: post.postId, userId: user.id }));
    } else {
      // Like post
      likePostInDB(post.postId, user.id);
      dispatch(likePostInStore({ postId: post.postId, userId: user.id }));
    }
  };

  const deletePost = () => {
    // Delete post from DB
    deletePostFromDB(post.postId);
    // Delete post from store
    dispatch(deletePostInStore(post.postId));
  };

  const togglePostMenu = () => {
    setpostMenu(!postMenu);
  };

  return (
    <StyledPost>
      <div className="head">
        <div className="left">
          <div
            className="image"
            onClick={() => {
              navigate(`/user/${person?.id}`);
            }}
          >
            <img
              src={person?.photoUrl || image}
              alt="user"
              data-testid="user-image"
            />
          </div>
          <div className="meta-data">
            <p
              className="user-name"
              data-testid="user-name"
              onClick={() => {
                navigate(`/user/${person?.id}`);
              }}
            >
              {person?.name || "User Name"}
            </p>
            <p className="post-date" data-testid="post-date">
              {calculateTime(new Date(post.date), new Date(Date.now()))}
            </p>
          </div>
        </div>
        {post.userId === user.id && (
          <div className="right">
            <div
              className="button"
              typeof="button"
              style={postMenu ? { backgroundColor: "#f0f2f5" } : {}}
              onClick={togglePostMenu}
            >
              <h3 data-testid="more-button">
                <MoreHoriz size={24} />
              </h3>
              {postMenu && (
                <div className="post-menu">
                  <button className="delete-post" onClick={deletePost}>
                    Delete post
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
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
        <div className="likes" onClick={() => toggleShowLikes()}>
          <p className="like-icon" data-testid="like-icon">
            <ThumbUp size={12} color="white" />
          </p>
          <p data-testid="likes">{post.likes.length}</p>
        </div>
        <div className="comments">
          <p data-testid="comments" onClick={toggleComments}>
            {post.comments.length} comment
            {post.comments.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>
      <div className="buttons">
        <div
          className="like"
          data-testid="like-button"
          style={post.likes.includes(user.id) ? { color: "#1977f2" } : {}}
          onClick={toggleLikeOnPost}
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
      <CommentSection
        comments={post.comments}
        postId={post.postId}
        showComments={showComments}
        showAll={showAll}
      />
      <AnimatePresence>
        {showLikes && <LikesViewer post={post} close={toggleShowLikes} />}
      </AnimatePresence>
      {post.comments.length > 3 && !showAll && (
        <p className="show-all-comments" onClick={toggleShowAllComments}>
          Show all comments
        </p>
      )}
      {post.comments.length > 3 && showAll && (
        <p className="show-fewer-comments" onClick={toggleShowAllComments}>
          Show fewer comments
        </p>
      )}
    </StyledPost>
  );
};

export default Post;
