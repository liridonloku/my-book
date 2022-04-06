import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Header from "./Header";
import Post from "./Post";
import StyledHome from "./styles/Home.styled";
import profile from "../images/profile.jpg";
import {
  addToFriendsList,
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

interface Props {}

const UserPage: React.FC<Props> = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const { id } = useParams();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);
  const people = useAppSelector((state) => state.people.data);
  const posts = useAppSelector((state) => state.posts.data);
  const friendRequests = useAppSelector((state) => state.friendRequests);

  const userFriends = people.find(
    (person) => person.id === user.id
  )?.friendList;

  const person = people.find((person) => person.id === id);
  const personPosts = posts.filter((post) => post.userId === person?.id);

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

  return (
    <>
      <Header />
      {person && (
        <StyledHome>
          {displayLeftSidebar && <div className="left"></div>}
          <div className="main" data-testid="main">
            <div className="user-info">
              <div className="left">
                <div className="image">
                  <img src={person.photoUrl || profile} alt="" />
                  {person.id === user.id && (
                    <div className="change-image">
                      <ImageEdit size={24} color={"grey"} />
                      Change picture
                    </div>
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
            {userFriends?.includes(person.id) ? (
              personPosts.map((post) => <Post key={post.postId} post={post} />)
            ) : (
              <p>
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
