import styled from "styled-components";

const StyledComment = styled.div`
  padding: 2px 0;
  display: flex;
  gap: 5px;

  .image {
    flex-shrink: 0;
    border-radius: 50%;
    width: 38px;
    height: 38px;
    align-self: flex-start;
    margin-top: 1px;
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

  .comment {
    position: relative;

    .comment-content {
      padding: 8px 30px 8px 10px;
      font-size: 14px;
      border-radius: 15px;
      background-color: #f0f2f5;
      white-space: pre-wrap;

      .user-name {
        font-weight: 600;
        font-size: 13px;
      }
    }

    .comment-actions {
      padding: 0 8px;
      display: flex;
      gap: 10px;
      font-size: 13px;
      color: #65676b;

      p {
        cursor: pointer;
      }

      .like {
        font-weight: 600;

        :hover {
          text-decoration: underline;
        }
      }
    }

    .delete-comment {
      //display: none;
      cursor: pointer;
      position: absolute;
      top: calc((100% - 32px) / 2);
      right: 0px;
    }
  }
`;

export default StyledComment;
