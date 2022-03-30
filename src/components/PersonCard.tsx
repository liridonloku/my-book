import React from "react";
import StyledPersonCard from "./styles/PersonCard.styled";
import { Data } from "../app/features/people/people";
import profile from "../images/profile.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  addToFriendsList,
  cancelFriendRequest,
  sendFriendRequest,
} from "../app/firebase";
import { useAppDispatch } from "../app/hooks";
import { addFriend as addFriendToStore } from "../app/features/friends/friends";
import {
  addNewSentRequest,
  cancelSentRequest,
} from "../app/features/friendRequests/friendRequests";
import { Timestamp } from "firebase/firestore";

interface Props {
  person: Data;
}

const PersonCard: React.FC<Props> = ({ person }) => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);
  const friends = useSelector((state: RootState) => state.friends.data);
  const friendRequests = useSelector(
    (state: RootState) => state.friendRequests
  );

  const addFriend = () => {
    sendFriendRequest(user.id, person.id);
    dispatch(
      addNewSentRequest({
        senderId: user.id,
        receiverId: person.id,
        status: "pending",
        date: Timestamp.now().toMillis(),
      })
    );
  };

  const cancelRequest = async () => {
    await cancelFriendRequest(user.id, person.id);
    dispatch(cancelSentRequest(person.id));
  };

  const acceptRequest = async () => {
    await addToFriendsList(user.id, person.id);
    addFriendToStore(person.id);
  };

  const friendshipStatus = () => {
    if (friends.includes(person.id)) {
      return (
        <button className="friends" disabled>
          Friends
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
      friendRequests.received.some((request) => request.senderId === person.id)
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
  };

  return (
    <StyledPersonCard>
      <div className="card">
        <div className="image">
          <img src={person.photoUrl || profile} alt="" />
        </div>
        <div className="user-name">
          <span>{person.name}</span>
        </div>
        <div className="action-button">{friendshipStatus()}</div>
      </div>
    </StyledPersonCard>
  );
};

export default PersonCard;
