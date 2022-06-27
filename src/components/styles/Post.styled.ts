import styled from "styled-components";

const StyledPost = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;

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
          width: 100%;
          height: 100%;
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

          :hover {
            text-decoration: underline;
          }
        }

        .post-date {
          font-size: small;
          cursor: default;
        }
      }
    }

    .right {
      position: relative;

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
        .post-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background-color: white;
          border-radius: 8px;
          padding: 2px;
          box-shadow: 0 2px 15px 2px rgba(0, 0, 0, 0.2);

          .delete-post {
            background: none;
            border: none;
            width: max-content;
            max-width: 250px;
            padding: 10px;

            :hover {
              background-color: #f0f2f5;
            }
          }
        }
      }
    }
  }

  .text {
    padding: 0 10px 10px 10px;
    white-space: pre-wrap;
  }

  .image {
    display: flex;
    justify-content: center;
    img {
      width: 100%;
      max-height: 500px;
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
      cursor: pointer;

      :hover {
        text-decoration: underline;
      }

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

      :hover {
        text-decoration: underline;
      }
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

  .show-all-comments,
  .show-fewer-comments {
    text-align: center;
    color: rgb(25, 119, 242);
    cursor: pointer;
    padding-bottom: 5px;

    :hover {
      text-decoration: underline;
    }
  }
`;

export default StyledPost;
