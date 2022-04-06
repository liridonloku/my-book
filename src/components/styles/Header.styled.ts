import styled from "styled-components";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  padding: 3px 5px;
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  z-index: 2;

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
      border-radius: 20px;
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
        color: #65676b;

        a:visited {
          color: #65676b;
        }
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
        position: relative;
        cursor: pointer;
        padding: 7px;
        border-radius: 50%;
        background-color: #e4e6eb;

        .not-available {
          position: absolute;
          top: -10px;
          right: -10px;
          background: none;
        }

        .user-menu {
          position: absolute;
          top: 110%;
          right: 0;
          background-color: white;
          border-radius: 8px;
          padding: 5px;
          box-shadow: 0 2px 15px 2px rgba(0, 0, 0, 0.2);

          :hover {
            background-color: white;
          }

          .log-out {
            cursor: pointer;
            background: none;
            border: none;
            border-radius: 8px;
            text-align: left;
            //width: max-content;
            min-width: 150px;
            max-width: 250px;
            padding: 10px;
            display: flex;
            align-items: center;
            gap: 5px;

            :hover {
              background-color: #e4e6eb;
            }
          }
        }
      }

      .settings:hover {
        background-color: #d0d3dc;
      }
    }
  }

  @media (max-width: 1260px) {
    .left {
      .search-bar {
        display: none;
      }
    }

    .right {
      .user {
        display: none;
      }
    }
  }

  @media (max-width: 480px) {
    .middle {
      div {
        padding: 5px 15px;
      }
    }
    .right {
      .right-nav {
        div {
          padding: 3px;
        }
      }
    }
  }
`;

export default StyledHeader;
