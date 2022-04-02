import React, { useEffect, useState } from "react";
import StyledRightSidebar from "./styles/RightSidebar.styled";
import ChatFriend from "./ChatFriend";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface Props {}

const RightSidebar: React.FC<Props> = () => {
  const user = useSelector((state: RootState) => state.user);
  const people = useSelector((state: RootState) => state.people.data);
  const [friendsList, setfriendsList] = useState<string[]>([]);

  useEffect(() => {
    let person = people.find((person) => person.id === user.id);
    if (person) {
      setfriendsList(person.friendList);
    }
  }, [people, user.id]);

  return (
    <StyledRightSidebar>
      <p className="contacts-header">Contacts</p>
      {friendsList?.map((id, index) => (
        <ChatFriend key={index} id={id} />
      ))}
    </StyledRightSidebar>
  );
};

export default RightSidebar;
