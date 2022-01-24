import styled from "styled-components";

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 2px 5px;
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
      align-items: center;
      padding: 0 5px;
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
  }

  .right {
    display: flex;
  }
`;

export default StyledHeader;
