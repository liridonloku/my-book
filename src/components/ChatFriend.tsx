import React from "react";
import StyledChatFriend from "./styles/ChatFriend.styled";
import image from "../images/profile.jpg";

interface Props {}

const ChatFriend: React.FC<Props> = () => {
  return (
    <StyledChatFriend>
      <div className="image">
        <img src={image} alt="profile" />
      </div>
      <div className="name">User Name</div>
    </StyledChatFriend>
  );
};

export default ChatFriend;
