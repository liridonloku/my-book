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

    .person-info {
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
          //width: 100px;
          //height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          img {
            border-radius: 50%;
            width: 100px;
            height: 100px;
            object-fit: cover;
          }

          input[type="file"] {
            z-index: -1;
            position: absolute;
            opacity: 0;
          }

          .change-image {
            background-color: white;
            border-radius: 8px;
            padding: 2px 5px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            width: max-content;
            cursor: pointer;
            align-items: center;
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

    .loading-posts {
      display: flex;
      justify-content: center;

      .lds-dual-ring {
        display: inline-block;
        width: 66px;
        height: 66px;
      }
      .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 6px solid #65676b;
        border-color: #65676b transparent #65676b transparent;
        animation: lds-dual-ring 1.2s linear infinite;
      }
      @keyframes lds-dual-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
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
