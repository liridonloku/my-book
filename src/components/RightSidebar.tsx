import React from "react";
import StyledRightSidebar from "./styles/RightSidebar.styled";
import ChatFriend from "./ChatFriend";

interface Props {}

const RightSidebar: React.FC<Props> = () => {
  const array: number[] = [];
  for (let i = 0; i < 50; i++) {
    array.push(i);
  }

  return (
    <StyledRightSidebar>
      <p className="contacts-header">Contacts</p>
      {array.map((element) => (
        <ChatFriend />
      ))}
    </StyledRightSidebar>
  );
};

export default RightSidebar;
