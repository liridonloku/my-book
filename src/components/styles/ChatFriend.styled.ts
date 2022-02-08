import styled from "styled-components";

const StyledChatFriend = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;

  .image {
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

  :hover {
    background-color: #dadde1;
  }
`;

export default StyledChatFriend;
