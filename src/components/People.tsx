import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import useLoginStatus from "../helpers/useLoginStatus";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import PersonCard from "./PersonCard";
import StyledHome from "./styles/Home.styled";
import ConfirmFriendRemoval from "./ConfirmFriendRemoval";
import { removeFromFriendsList } from "../app/firebase";
import { removeFriend as removeFriendFromState } from "../app/features/friends/friends";
import { useAppDispatch } from "../app/hooks";

interface Props {}

const People: React.FC<Props> = () => {
  const user = useSelector((state: RootState) => state.user);
  useLoginStatus(user);

  const dispatch = useAppDispatch();

  const people = useSelector((state: RootState) => state.people.data);

  const [friendRemoveModal, setfriendRemoveModal] = useState(false);
  const [idOfFriendToRemove, setidOfFriendToRemove] = useState("");

  const toggleModal = () => {
    setfriendRemoveModal(!friendRemoveModal);
  };

  const setFriendId = (id: string) => {
    setidOfFriendToRemove(id);
  };

  const removeFriend = async (id: string) => {
    dispatch(removeFriendFromState(id));
    await removeFromFriendsList(user.id, id);
    toggleModal();
    setFriendId("");
    window.location.reload();
  };

  //Display sidebars based on screen width
  const [displayLeftSidebar, setdisplayLeftSidebar] = useState(
    window.innerWidth < 1100 ? false : true
  );
  const [displayRightSidebar, setdisplayRightSidebar] = useState(
    window.innerWidth < 900 ? false : true
  );
  const resize = () => {
    if (window.innerWidth < 900) {
      setdisplayLeftSidebar(false);
      setdisplayRightSidebar(false);
    } else if (window.innerWidth < 1100) {
      setdisplayLeftSidebar(false);
      setdisplayRightSidebar(true);
    } else {
      setdisplayLeftSidebar(true);
      setdisplayRightSidebar(true);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  });

  return (
    <>
      <Header />
      <StyledHome>
        {displayLeftSidebar && (
          <div className="left">
            <LeftSidebar />
          </div>
        )}
        <div className="main" data-testid="main">
          {people.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              toggleModal={toggleModal}
              setFriendId={setFriendId}
            />
          ))}
        </div>
        {displayRightSidebar && (
          <div className="right">
            <RightSidebar />
          </div>
        )}
      </StyledHome>
      {friendRemoveModal && (
        <ConfirmFriendRemoval
          id={idOfFriendToRemove}
          toggleModal={toggleModal}
          setFriendId={setFriendId}
          removeFriend={removeFriend}
        />
      )}
    </>
  );
};

export default People;
