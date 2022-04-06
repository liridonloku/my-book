import styled from "styled-components";

const StyledHome = styled.div`
  padding: 10px 10px 0 10px;
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

    .user-info {
      background-color: white;
      border-radius: 8px;
      padding: 10px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;
        gap: 5px;
        .image {
          position: relative;
          padding: 0;
          border-radius: 50%;
          width: 100px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            border-radius: 50%;
            max-width: 100%;
            max-height: 100%;
            object-fit: cover;
          }

          .change-image {
            background-color: white;
            border-radius: 8px;
            padding: 2px 5px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            width: max-content;
            cursor: pointer;
            display: none;
            align-items: center;
            position: absolute;
            top: 0;
            left: 80%;
          }

          :hover {
            .change-image {
              display: flex;
            }
          }
        }

        .text {
          h4 {
            color: #65676b;
          }
        }
      }

      .right {
        .action-button {
          .add-friend {
            cursor: pointer;
            padding: 10px 8px;
            color: #fff;
            font-weight: bold;
            background-color: #1877f2;
            border: none;
            border-radius: 6px;
            transition-duration: 100ms;

            :hover {
              background-color: #1559b3;
            }

            :active {
              transform: scale(0.97);
            }
          }

          .remove-friend {
            cursor: pointer;
            padding: 10px 8px;
            color: #fff;
            font-weight: bold;
            background-color: #f21818;
            border: none;
            border-radius: 6px;
            transition-duration: 100ms;

            :hover {
              background-color: #b31515;
            }

            :active {
              transform: scale(0.97);
            }
          }

          .friends,
          .request-sent {
            cursor: pointer;
            padding: 10px 8px;
            font-weight: bold;
            border: none;
            border-radius: 6px;
          }
        }
      }
    }
  }

  @media (max-width: 480px) {
    padding: 5px 0;
    justify-content: center;

    .main {
      padding: 0;
      width: 100%;
      max-width: 100%;
      min-width: 320px;
    }
  }

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

export default StyledHome;
