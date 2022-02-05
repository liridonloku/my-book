import styled from "styled-components";

const StyledHome = styled.div`
  padding: 10px;
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
`;

export default StyledHome;
