import React from "react";
import StyledLoadingAnimation from "./styles/LoadingAnimation.styled";

interface Props {}

const LoadingAnimation: React.FC<Props> = () => {
  return (
    <StyledLoadingAnimation>
      <div className="lds-dual-ring"></div>
    </StyledLoadingAnimation>
  );
};

export default LoadingAnimation;
