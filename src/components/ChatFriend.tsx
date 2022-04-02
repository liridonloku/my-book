import React from "react";
import StyledChatFriend from "./styles/ChatFriend.styled";
import image from "../images/profile.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface Props {
  id: string;
}

const ChatFriend: React.FC<Props> = ({ id }) => {
  const people = useSelector((state: RootState) => state.people.data);
  const person = people.find((person) => person.id === id);
  return (
    <StyledChatFriend>
      {person && (
        <>
          <div className="image">
            <img src={person.photoUrl || image} alt="profile" />
          </div>
          <div className="name">{person.name}</div>
        </>
      )}
    </StyledChatFriend>
  );
};

export default ChatFriend;
