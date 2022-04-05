import { render, screen } from "@testing-library/react";
import Comment from "../Comment";

describe("Comment", () => {
  beforeEach(() => {
    render(
      <Comment
        comment={{
          userId: "string",
          date: 5,
          content: "content",
          likes: [],
        }}
      />
    );
  });

  it("Renders the users profile picture", () => {
    expect(screen.getByTestId("profile-pic")).toBeInTheDocument();
  });

  it("Renders the users name", () => {
    expect(screen.getByTestId("user-name")).toBeInTheDocument();
  });

  it("Renders the comment text", () => {
    expect(screen.getByTestId("comment-text")).toBeInTheDocument();
  });

  it("Renders the comment like button", () => {
    expect(screen.getByTestId("like-button")).toBeInTheDocument();
  });

  it("Renders the date the comment was posted (or time since then)", () => {
    expect(screen.getByTestId("date-posted")).toBeInTheDocument();
  });
});
