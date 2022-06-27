import styled from "styled-components";

const StyledLikesViewer = styled.div`
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
    min-height: 400px;
    max-height: 600px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);

    .top-part {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #d0d3dc;

      .likes {
        display: flex;
        gap: 10px;
        align-items: center;
        cursor: pointer;

        .like-icon {
          padding: 3px;
          border-radius: 50%;
          background-color: #1977f2;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

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
      flex-grow: 0;
      padding: 10px;
      margin-bottom: 15px;
      overflow: scroll;
    }
  }
`;

export default StyledLikesViewer;
