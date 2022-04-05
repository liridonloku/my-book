import styled from "styled-components";

const StyledPreload = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    color: #1977f2;
    font-size: xx-large;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
  }

  .lds-dual-ring {
    display: inline-block;
    width: 50px;
    height: 50px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 4px solid #1977f2;
    border-color: #1977f2 transparent #1977f2 transparent;
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

export default StyledPreload;
