import styled from "styled-components";

const StyledRightSidebar = styled.div`
  position: sticky;
  top: 62px;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 62px);
  overflow-y: hidden;
  width: 300px;

  .contacts-header {
    padding: 5px;
    color: #65676b;
    font-weight: bold;
  }

  :hover {
    overflow-y: scroll;
  }
`;

export default StyledRightSidebar;
