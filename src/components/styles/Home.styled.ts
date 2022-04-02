import styled from "styled-components";

const StyledHome = styled.div`
  padding: 10px 10px 0 10px;
  display: flex;
  justify-content: space-between;
  background-color: #f0f2f5;
  width: fit-content;
  min-height: calc(100vh - 62px);
  min-width: 100%;

  .main {
    flex-grow: 1;
    padding: 0 15px;
    max-width: min(680px, 90vw);
    width: 50%;
    min-width: 400px;
  }

  @media (max-width: 480px) {
    padding: 5px 0;
    justify-content: center;

    .main {
      padding: 0;
      width: 100%;
      max-width: 100%;
      min-width: 320px;
    }
  }

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

export default StyledHome;
