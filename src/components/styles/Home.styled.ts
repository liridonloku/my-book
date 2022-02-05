import styled from "styled-components";

const StyledHome = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background-color: #f0f2f5;
  width: fit-content;
  min-height: calc(100vh - 62px);

  .main {
    padding: 0 15px;
    max-width: 680px;
    width: 50%;
    min-width: 400px;
  }
`;

export default StyledHome;
