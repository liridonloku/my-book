import React from "react";
import StyledPersonCard from "./styles/PersonCard.styled";
import { Data } from "../app/features/people/people";
import profile from "../images/profile.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  addToFriendsList,
  deleteFriendRequest,
  sendFriendRequest,
} from "../app/firebase";
import { useAppDispatch } from "../app/hooks";
import { addFriend as addFriendToStore } from "../app/features/friends/friends";
import {
  addNewSentRequest,
  cancelSentRequest,
  removeReceivedRequest,
} from "../app/features/friendRequests/friendRequests";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface Props {
  person: Data;
  toggleModal: Function;
  setFriendId: Function;
}

const PersonCard: React.FC<Props> = ({ person, toggleModal, setFriendId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    await deleteFriendRequest(user.id, person.id);
    dispatch(cancelSentRequest(person.id));
  };

  const acceptRequest = async () => {
    await addToFriendsList(user.id, person.id);
    dispatch(addFriendToStore(person.id));
    dispatch(removeReceivedRequest(person.id));
  };

  const openConfirmationBox = () => {
    setFriendId(person.id);
    toggleModal();
  };

  const friendshipStatus = () => {
    if (user.id === person.id) {
      return (
        <button className="friends you" disabled>
          You
        </button>
      );
    } else if (friends.includes(person.id)) {
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
        <div
          className="image"
          onClick={() => {
            navigate(`/user/${person.id}`);
          }}
        >
          <img src={person.photoUrl || profile} alt="" />
        </div>
        <div className="user-name">
          <span
            onClick={() => {
              navigate(`/user/${person.id}`);
            }}
          >
            {person.name}
          </span>
        </div>
        <div className="action-button">{friendshipStatus()}</div>
      </div>
    </StyledPersonCard>
  );
};

export default PersonCard;
