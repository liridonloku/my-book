import styled from "styled-components";

const StyledNewPostModal = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 2;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    background-color: white;
    width: 90vw;
    max-width: 500px;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);

    .top-part {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #d0d3dc;

      .close-button {
        padding: 1px;
        border-radius: 50%;
        background-color: #e4e6eb;
        cursor: pointer;

        :hover {
          background-color: #d0d3dc;
        }
      }
    }

    .content {
      .user-info {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 10px 0;
        margin-bottom: 10px;

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

        p {
          font-weight: bold;
        }
      }

      .caption-container {
        margin-bottom: 10px;
        .caption {
          flex-grow: 1;
          cursor: text;
          border: none;
          background-color: inherit;
          word-break: break-word;
          font-family: inherit;
          resize: none;
          overflow: hidden;

          :focus {
            outline: none;
          }
        }
      }

      .post-image {
        display: flex;
        position: relative;
        justify-content: center;
        img {
          width: 100%;
          max-height: 200px;
          object-fit: contain;
        }
        .remove-image {
          cursor: pointer;
          position: absolute;
          top: 0;
          right: 0;
          background-color: #e4e6eb;
          border-radius: 50%;

          :hover {
            background-color: #d0d3dc;
          }
        }
      }

      .add-image {
        display: flex;
        justify-content: center;
        padding: 5px 0;

        input[type="file"] {
          z-index: -1;
          position: absolute;
          opacity: 0;
        }

        label {
          cursor: pointer;
          background: none;
          border: none;
          border-radius: 5px;
          padding: 3px 8px;
          display: flex;
          align-items: flex-end;
          gap: 5px;
          font-weight: bold;

          :active {
            background-color: #e4e6eb;
          }
        }
      }
    }

    .submit {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        flex-grow: 1;
        cursor: pointer;
        color: #fff;
        background-color: #1877f2;
        border: none;
        border-radius: 6px;
        padding: 3px 0;
        font-size: 20px;

        :hover {
          background-color: #1559b3;
        }

        :disabled {
          background-color: lightgray;
        }
      }
    }
  }
`;

export default StyledNewPostModal;
