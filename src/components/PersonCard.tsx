import React from "react";
import StyledPersonCard from "./styles/PersonCard.styled";
import { Data } from "../app/features/people/people";
import profile from "../images/profile.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { sendFriendRequest } from "../app/firebase";

interface Props {
  person: Data;
}

const PersonCard: React.FC<Props> = ({ person }) => {
  const user = useSelector((state: RootState) => state.user);
  const friends = useSelector((state: RootState) => state.friends.data);
  const friendRequests = useSelector(
    (state: RootState) => state.friendRequests
  );

  const addFriend = () => {
    sendFriendRequest(user.id, person.id);
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
        <button className="request-sent" disabled>
          Request sent
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
