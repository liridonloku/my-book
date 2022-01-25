import styled from "styled-components";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  width: fit-content;
  padding: 3px 5px;
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left {
    display: flex;

    .icon {
      display: flex;
      cursor: pointer;
      align-items: center;
      padding: 0 5px;
      color: #1977f2;
    }

    .search-bar {
      background-color: #f0f2f5;
      border-radius: 30px;
      padding: 8px 10px;
      display: flex;
      align-items: center;

      input {
        color: #050505;
        border: none;
        background-color: inherit;
      }

      input:focus {
        outline: none;
      }
    }
  }

  .middle {
    display: flex;
    gap: 5px;

    div {
      padding: 10px 30px;
      border-radius: 10px;
      cursor: pointer;

      h3 {
        color: #385898;
      }
    }

    div:hover {
      background-color: #f0f2f5;
    }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 5px;

    .user {
      border-radius: 10px;
      padding: 0 3px;
      display: flex;
      gap: 5px;

      :hover {
        background-color: #e4e6eb;
      }

      div {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      .image {
        border-radius: 50%;
        width: 30px;
        height: 30px;
      }

      img {
        border-radius: 50%;
        max-width: 95%;
        max-height: 95%;
        object-fit: cover;
      }
    }

    .right-nav {
      display: flex;
      gap: 7px;

      div {
        cursor: pointer;
        padding: 7px;
        border-radius: 50%;
        background-color: #e4e6eb;
      }

      div:hover {
        background-color: #d0d3dc;
      }
    }
  }
`;

export default StyledHeader;
