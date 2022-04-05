import React from "react";
import { useAppSelector } from "../app/hooks";
import useLoginStatus from "../helpers/useLoginStatus";
import StyledPreload from "./styles/Preload.styled";

interface Props {}

const Preload: React.FC<Props> = () => {
  const user = useAppSelector((state) => state.user);
  useLoginStatus(user);

  return (
    <StyledPreload>
      <div className="icon">
        <h1>M</h1>
        <div className="lds-dual-ring"></div>
      </div>
    </StyledPreload>
  );
};

export default Preload;
