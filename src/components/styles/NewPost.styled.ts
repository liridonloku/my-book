import styled from "styled-components";

const StyledNewPost = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .top {
    display: flex;
    align-items: center;
    gap: 5px;
    width: 100%;
    margin-bottom: 10px;

    .image {
      border-radius: 50%;
      width: 38px;
      height: 38px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .form {
      color: #65676b;
      flex-grow: 1;
      background-color: #f0f2f5;
      border-radius: 30px;
      padding: 8px 15px;
      display: flex;
      align-items: center;
      font-size: 20px;
      cursor: pointer;

      :hover {
        background-color: #e4e6eb;
      }
    }
  }
  .separator {
    width: 100%;
    border-bottom: 1px solid #e4e6eb;
  }

  .bottom {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin-top: 10px;

    div {
      position: relative;
      width: 33%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3px;
      padding: 10px 0;
      border-radius: 8px;
      cursor: pointer;
      color: #65676b;
      font-weight: bold;
      font-size: 14px;

      .not-available {
        position: absolute;
        top: -8px;
        right: -8px;
        background: none;
      }
    }

    .photo-post:hover {
      background-color: #f0f2f5;
    }
  }
`;

export default StyledNewPost;
