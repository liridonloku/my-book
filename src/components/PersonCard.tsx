import React from "react";
import StyledPersonCard from "./styles/PersonCard.styled";
import { Data } from "../app/features/people/people";
import profile from "../images/profile.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface Props {
  person: Data;
}

const PersonCard: React.FC<Props> = ({ person }) => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <StyledPersonCard>
      <div className="card">
        <div className="image">
          <img src={person.photoUrl || profile} alt="" />
        </div>
        <div className="user-name">
          <span>{person.name}</span>
        </div>
        <div className="action-button">
          {person.id !== user.id ? (
            <button className="add-friend">Add Friend</button>
          ) : (
            <button className="friends" disabled>
              Friends
            </button>
          )}
        </div>
      </div>
    </StyledPersonCard>
  );
};

export default PersonCard;
