import React from "react";
import StyledPersonCard from "./styles/PersonCard.styled";
import { Data } from "../app/features/people/people";
import profile from "../images/profile.jpg";

interface Props {
  person: Data;
}

const PersonCard: React.FC<Props> = ({ person }) => {
  return (
    <StyledPersonCard>
      <div className="card">
        <div className="image">
          <img src={person.photoUrl || profile} alt="" />
        </div>
        <div className="user-name">{person.name}</div>
        <div className="action-button">
          <button>Add Friend</button>
        </div>
      </div>
    </StyledPersonCard>
  );
};

export default PersonCard;
