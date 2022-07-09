import React, { useEffect, useState } from "react";
import StyledLikesViewer from "./styles/LikesViewer.styled";
import { X } from "styled-icons/bootstrap";
import { ThumbUp } from "styled-icons/material";
import { PostData } from "../app/features/posts/posts";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import PersonCard from "./PersonCard";
import { Data } from "../app/features/people/people";
import { getFriendRequests, removeFromFriendsList } from "../app/firebase";
import { removeFriend as removeFriendFromState } from "../app/features/friends/friends";
import {
  populateReceivedRequests,
  populateSentRequests,
} from "../app/features/friendRequests/friendRequests";
import ConfirmFriendRemoval from "./ConfirmFriendRemoval";

interface Props {
  close: Function;
  post: PostData;
}

const LikesViewer: React.FC<Props> = ({ post, close }) => {
  const user = useAppSelector((state) => state.user);
  const people = useAppSelector((state) => state.people.data);
  const peopleFromLikes = people.filter((person) =>
    post.likes.includes(person.id)
  );

  const dispatch = useAppDispatch();

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

  useEffect(() => {
    const populateFriendRequests = async (userId: string) => {
      const requests = await getFriendRequests();
      const sentRequests = requests
        .filter((request) => request.senderId === userId)
        .map((request) => ({ ...request, date: request.date.toMillis() }));
      const receivedRequests = requests
        .filter((request) => request.receiverId === userId)
        .map((request) => ({ ...request, date: request.date.toMillis() }));
      dispatch(populateSentRequests(sentRequests));
      dispatch(populateReceivedRequests(receivedRequests));
    };
    populateFriendRequests(user.id);
  });

  const renderPeopleFromLikes = (list: Data[]) => {
    return list.map((person) => (
      <PersonCard
        person={person}
        toggleModal={toggleModal}
        setFriendId={setFriendId}
        displayButton={false}
      />
    ));
  };

  return (
    <>
      <StyledLikesViewer>
        <div className="modal">
          <div className="top-part">
            <div className="likes">
              <p className="like-icon" data-testid="like-icon">
                <ThumbUp size={12} color="white" />
              </p>
              <p data-testid="likes">{post.likes.length}</p>
            </div>
            <div className="close-button" onClick={() => close()}>
              <X size={32} color={"grey"} />
            </div>
          </div>
          <div className="content">
            {renderPeopleFromLikes(peopleFromLikes)}
          </div>
        </div>
      </StyledLikesViewer>
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

export default LikesViewer;
