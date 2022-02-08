import React from "react";
import StyledRightSidebar from "./styles/RightSidebar.styled";

interface Props {}

const RightSidebar: React.FC<Props> = () => {
  return (
    <StyledRightSidebar>
      <p className="contacts-header">Contacts</p>
    </StyledRightSidebar>
  );
};

export default RightSidebar;
