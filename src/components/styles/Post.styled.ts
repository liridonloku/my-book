import styled from "styled-components";

const StyledPost = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  .head {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      gap: 5px;

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
          max-width: 100%;
          max-height: 100%;
          object-fit: cover;
        }
      }

      .meta-data {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1px;

        * {
          cursor: pointer;
        }

        .user-name {
          font-weight: bold;
        }

        .post-date {
          font-size: small;
        }
      }
    }

    .right {
      .button {
        border-radius: 50%;
        cursor: pointer;
        padding: 5px;
        h3 {
          color: #65676b;
        }

        :hover {
          background-color: #f0f2f5;
        }
      }
    }
  }

  .text {
    padding: 0 10px 10px 10px;
  }

  .image {
    display: flex;
    justify-content: center;
    img {
      width: 100%;
      max-height: 600px;
      object-fit: contain;
    }
  }

  .stats {
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      font-size: 14px;
      color: #65676b;
    }

    .likes {
      display: flex;
      gap: 10px;
      align-items: center;
      cursor: default;

      .like-icon {
        padding: 3px;
        border-radius: 50%;
        background-color: #1977f2;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .comments {
      cursor: pointer;
    }
  }

  .buttons {
    height: 40px;
    margin: 0 15px;
    border-top: 1px solid #ced0d4;
    display: flex;
    align-items: center;

    div {
      width: 50%;
      padding: 5px 0;
      border-radius: 5px;
      display: flex;
      gap: 8px;
      justify-content: center;
      align-items: center;
      color: #65676b;
      cursor: pointer;

      :hover {
        background-color: #f0f2f5;
      }
    }
  }
`;

export default StyledPost;
