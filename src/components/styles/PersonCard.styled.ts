import styled from "styled-components";

const StyledPersonCard = styled.div`
  .card {
    padding: 10px 5px;
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
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

    .user-name {
      flex-grow: 1;

      span {
        cursor: pointer;
      }
    }

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
          transform: scale(0.95);
        }
      }

      .friends {
        padding: 10px 8px;
        font-weight: bold;
        border: none;
        border-radius: 6px;
      }
    }
  }
`;

export default StyledPersonCard;
