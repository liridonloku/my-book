import styled from "styled-components";

const StyledLeftSidebar = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  font-size: 14px;
  width: 300px;

  div {
    border-radius: 10px;
    padding: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    width: 100%;

    :hover {
      background-color: #dadde1;
    }

    .image,
    .icon {
      padding: 0;
      border-radius: 50%;
      width: 38px;
      height: 38px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      img {
        border-radius: 50%;
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
      }
    }
  }
`;

export default StyledLeftSidebar;
