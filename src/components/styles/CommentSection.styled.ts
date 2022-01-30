import styled from "styled-components";

const StyledCommentSection = styled.div`
  border-top: 1px solid #ced0d4;
  margin: 0 15px;
  padding: 10px 0;
  display: flex;
  flex-direction: column;

  .comment-box {
    display: flex;
    align-items: center;

    .image {
      flex-shrink: 0;
      border-radius: 50%;
      width: 38px;
      height: 38px;
      align-self: flex-start;
      padding-top: 1px;
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

    .comment-input {
      flex-grow: 1;
      background-color: #f0f2f5;
      border-radius: 20px;
      padding: 8px 10px;
      display: flex;
      gap: 2px;
      align-items: center;

      .comment-content {
        flex-grow: 1;
        cursor: text;
        border: none;
        background-color: inherit;
        height: 20px;
        word-break: break-word;
        font-family: inherit;
        resize: none;
        overflow: hidden;

        :focus {
          outline: none;
        }
      }

      .send-icon {
        cursor: pointer;
        flex-shrink: 0;
        height: 100%;
        display: flex;
        align-self: flex-end;
      }
    }
  }
`;

export default StyledCommentSection;
