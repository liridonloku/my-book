import styled from "styled-components";

const StyledCommentSection = styled.div`
  border-top: 1px solid #ced0d4;
  margin: 5px 15px;
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
      align-items: center;

      // prettier-ignore
      [contenteditable=true]:empty:before{
      content: attr(placeholder);
      color: #65676b;
      pointer-events: none;
      display: block; /* For Firefox */
      }

      .comment-content {
        flex-grow: 1;
        cursor: text;

        :focus {
          outline: none;
        }
      }

      .send-icon {
        cursor: pointer;
        flex-shrink: 0;
        height: 100%;
        display: flex;
        align-items: flex-end;
      }
    }
  }
`;

export default StyledCommentSection;
