import React from "react";
import StyledRightSidebar from "./styles/RightSidebar.styled";
import ChatFriend from "./ChatFriend";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface Props {}

const RightSidebar: React.FC<Props> = () => {
  const friendList = useSelector((state: RootState) => state.friends.data);

  return (
    <StyledRightSidebar>
      <p className="contacts-header">Contacts</p>
      {friendList?.map((id) => (
        <ChatFriend key={id} id={id} />
      ))}
    </StyledRightSidebar>
  );
};

export default RightSidebar;
