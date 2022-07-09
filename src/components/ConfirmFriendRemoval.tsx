import React from "react";
import StyledNewAccountForm from "./styles/NewAccountForm.styled";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { motion } from "framer-motion";
import { dropIn } from "./NewPostModal";

interface Props {
  id: string;
  toggleModal: Function;
  setFriendId: Function;
  removeFriend: Function;
}

const ConfirmFriendRemoval: React.FC<Props> = ({
  id,
  toggleModal,
  setFriendId,
  removeFriend,
}) => {
  const people = useSelector((state: RootState) => state.people.data);
  const person = people.find((item) => item.id === id);

  return (
    <StyledNewAccountForm>
      {person && (
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            removeFriend(id);
          }}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="top">
            <h3 className="title">Are you sure?</h3>
          </div>
          <div className="information">
            <p>
              Do you want to remove {person.name} from your friends list? Press
              Remove to confirm.
            </p>
          </div>
          <div className="confirm">
            <button type="submit" className="remove">
              Remove
            </button>
            <button
              type="button"
              className="cancel"
              onClick={(e) => {
                e.preventDefault();
                toggleModal();
                setFriendId("");
              }}
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}
      {!person && (
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          onAbort={(e) => {
            e.preventDefault();
          }}
        >
          <div className="top">
            <h3 className="title">An error ocurred.</h3>
          </div>
          <div className="information">
            <p>Something went wrong! Please try again later.</p>
          </div>
          <div className="confirm">
            <button type="submit">Ok</button>
          </div>
        </motion.form>
      )}
    </StyledNewAccountForm>
  );
};

export default ConfirmFriendRemoval;
