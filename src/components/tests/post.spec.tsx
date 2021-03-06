import { render, screen } from "@testing-library/react";
import Post from "../Post";

describe("Post Component", () => {
  beforeEach(() => {
    render(
      <Post
        post={{
          postId: "",
          userId: "",
          date: 5,
          caption: "",
          image: "",
          likes: [],
          comments: [],
        }}
      />
    );
  });

  it("Renders the user profile image", () => {
    expect(screen.getByTestId("user-image")).toBeInTheDocument();
  });

  it("Renders user name and date posted", () => {
    expect(screen.getByTestId("user-name")).toBeInTheDocument();
    expect(screen.getByTestId("post-date")).toBeInTheDocument();
  });

  it("Renders the more buton", () => {
    expect(screen.getByTestId("more-button")).toBeInTheDocument();
  });

  it("Renders like and comment numbers", () => {
    expect(screen.getByTestId("like-icon")).toBeInTheDocument();
    expect(screen.getByTestId("likes")).toBeInTheDocument();
    expect(screen.getByTestId("comments")).toBeInTheDocument();
  });

  it("Renders the Like and Comment buttons", () => {
    expect(screen.getByTestId("like-button")).toBeInTheDocument();
    expect(screen.getByTestId("comment-button")).toBeInTheDocument();
  });
});
