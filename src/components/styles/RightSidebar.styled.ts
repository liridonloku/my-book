import styled from "styled-components";

const StyledRightSidebar = styled.div`
  position: sticky;
  top: 60px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  overflow-y: scroll;
  width: 300px;

  .contacts-header {
    padding: 5px;
    color: #65676b;
    font-weight: bold;
  }
`;

export default StyledRightSidebar;
