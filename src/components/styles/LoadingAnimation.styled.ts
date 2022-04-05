import styled from "styled-components";

const StyledLoadingAnimation = styled.div`
  .lds-dual-ring {
    display: inline-block;
    width: 19px;
    height: 19px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    border: 4px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default StyledLoadingAnimation;
