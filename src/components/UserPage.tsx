import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Header from "./Header";
import Post from "./Post";
import StyledHome from "./styles/Home.styled";
import profile from "../images/profile.jpg";
import {
  addToFriendsList,
  changePersonPhotoUrl,
  changeProfilePicture,
  deleteFriendRequest,
  removeFromFriendsList,
  sendFriendRequest,
} from "../app/firebase";
import {
  addNewSentRequest,
  cancelSentRequest,
  removeReceivedRequest,
} from "../app/features/friendRequests/friendRequests";
import {
  addFriend as addFriendToStore,
  removeFriend as removeFriendFromState,
} from "../app/features/friends/friends";
import { Timestamp } from "@firebase/firestore";
import ConfirmFriendRemoval from "./ConfirmFriendRemoval";
import { ImageEdit } from "styled-icons/fluentui-system-regular";
import { uploadPicture } from "../app/cloudinary";
import { changePersonPhoto } from "../app/features/people/people";
import { changePhotoUrl } from "../app/features/user/user";
import { PostData } from "../app/features/posts/posts";
import useLoginStatus from "../helpers/useLoginStatus";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {}

const UserPage: React.FC<Props> = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const { id } = useParams();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);
  useLoginStatus(user);

  const people = useAppSelector((state) => state.people.data);
  const posts = useAppSelector((state) => state.posts.data);
  const friendRequests = useAppSelector((state) => state.friendRequests);

  const userFriends = useAppSelector((state) => state.friends.data);

  const person = people.find((person) => person.id === id);
  const personPosts = posts.filter((post) => post.userId === person?.id);

  const [relevantPosts, setrelevantPosts] = useState<PostData[]>([]);
  const [hasMore, sethasMore] = useState(true);

  useEffect(() => {
    const filteredPosts = posts.filter((post) => post.userId === person?.id);
    setrelevantPosts(filteredPosts.slice(0, 5));
    if (filteredPosts.length <= 5) {
      sethasMore(false);
    }
  }, [posts, person?.id]);

  const addMore = () => {
    if (relevantPosts.length >= personPosts.length) {
      sethasMore(false);
      return;
    }
    const postsToAdd = personPosts.slice(
      relevantPosts.length,
      relevantPosts.length + 5
    );
    setTimeout(() => {
      setrelevantPosts((previous) => previous.concat(postsToAdd));
    }, 500);
  };

  //Display sidebars based on screen width
  const [displayLeftSidebar, setdisplayLeftSidebar] = useState(
    window.innerWidth < 1100 ? false : true
  );
  const [displayRightSidebar, setdisplayRightSidebar] = useState(
    window.innerWidth < 900 ? false : true
  );

  const resize = () => {
    if (window.innerWidth < 900) {
      setdisplayLeftSidebar(false);
      setdisplayRightSidebar(false);
    } else if (window.innerWidth < 1100) {
      setdisplayLeftSidebar(false);
      setdisplayRightSidebar(true);
    } else {
      setdisplayLeftSidebar(true);
      setdisplayRightSidebar(true);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  });

  const addFriend = () => {
    if (person) {
      sendFriendRequest(user.id, person.id);
      dispatch(
        addNewSentRequest({
          senderId: user.id,
          receiverId: person.id,
          status: "pending",
          date: Timestamp.now().toMillis(),
        })
      );
    }
  };

  const cancelRequest = async () => {
    if (person) {
      await deleteFriendRequest(user.id, person.id);
      dispatch(cancelSentRequest(person.id));
    }
  };

  const acceptRequest = async () => {
    if (person) {
      await addToFriendsList(user.id, person.id);
      dispatch(addFriendToStore(person.id));
      dispatch(removeReceivedRequest(person.id));
    }
  };

  const openConfirmationBox = () => {
    setFriendId(person?.id || "");
    toggleModal();
  };

  const removeFriend = async (id: string) => {
    dispatch(removeFriendFromState(id));
    await removeFromFriendsList(user.id, id);
    toggleModal();
    setFriendId("");
    window.location.reload();
  };

  const [friendRemoveModal, setfriendRemoveModal] = useState(false);
  const [idOfFriendToRemove, setidOfFriendToRemove] = useState("");

  const toggleModal = () => {
    setfriendRemoveModal(!friendRemoveModal);
  };

  const setFriendId = (id: string) => {
    setidOfFriendToRemove(id);
  };

  const friendshipStatus = () => {
    if (person) {
      if (user.id === person.id) {
        return (
          <button className="friends you" disabled>
            You
          </button>
        );
      } else if (userFriends?.includes(person.id)) {
        return (
          <button className="remove-friend" onClick={openConfirmationBox}>
            Remove Friend
          </button>
        );
      } else if (
        friendRequests.sent.some((request) => request.receiverId === person.id)
      ) {
        return (
          <button className="request-sent" onClick={cancelRequest}>
            Cancel Request
          </button>
        );
      } else if (
        friendRequests.received.some(
          (request) => request.senderId === person.id
        )
      ) {
        return (
          <button className="add-friend" onClick={acceptRequest}>
            Accept Friend Request
          </button>
        );
      } else {
        return (
          <button className="add-friend" onClick={addFriend}>
            Add Friend
          </button>
        );
      }
    }
  };

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      //Updload to cloudinary
      const imageData = await uploadPicture(file);
      const imageUrl = imageData.data.secure_url;
      //Update userProfile
      changeProfilePicture(imageUrl);
      //Update people
      changePersonPhotoUrl(user.id, imageUrl);
      //Update store (user and person)
      dispatch(changePersonPhoto({ id: user.id, imageUrl }));
      dispatch(changePhotoUrl(imageUrl));
    }
    e.target.value = "";
  };

  return (
    <>
      <Header />
      {person && (
        <StyledHome>
          {displayLeftSidebar && <div className="left"></div>}
          <div className="main" data-testid="main">
            <div className="person-info">
              <div className="left">
                <div className="image">
                  <img src={person.photoUrl || profile} alt="" />
                  {person.id === user.id && (
                    <>
                      <input
                        type="file"
                        name="file"
                        id="file"
                        accept="image/*"
                        onChange={(e) => {
                          onImageChange(e);
                        }}
                      />
                      <label htmlFor="file" className="change-image">
                        <ImageEdit size={24} color={"grey"} />
                        Change picture
                      </label>
                    </>
                  )}
                </div>
                <div className="text">
                  <h3>{person.name}</h3>
                  <h4>
                    {person.friendList.length - 1} Friend
                    {person.friendList.length - 1 === 1 ? "" : "s"}
                  </h4>
                </div>
              </div>
              <div className="right">
                <div className="action-button">{friendshipStatus()}</div>
              </div>
            </div>
            <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Posts</h2>
            {userFriends?.includes(person.id) ? (
              <InfiniteScroll
                dataLength={relevantPosts.length}
                next={addMore}
                hasMore={hasMore}
                loader={
                  <div className="loading-posts">
                    <div className="lds-dual-ring"></div>
                  </div>
                }
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    You've reached the end...
                  </p>
                }
              >
                {relevantPosts.map((post) => (
                  <Post key={post.postId} post={post} />
                ))}
              </InfiniteScroll>
            ) : (
              <p style={{ textAlign: "center" }}>
                Add {person.name} as a friend to be able to see their posts.
              </p>
            )}
          </div>
          {displayRightSidebar && <div className="right"></div>}
        </StyledHome>
      )}
      {friendRemoveModal && (
        <ConfirmFriendRemoval
          id={idOfFriendToRemove}
          toggleModal={toggleModal}
          setFriendId={setFriendId}
          removeFriend={removeFriend}
        />
      )}
    </>
  );
};

export default UserPage;
