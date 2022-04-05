import { screen, render } from "@testing-library/react";
import CommentBox from "../CommentBox";

describe("Comment box", () => {
  beforeEach(() => {
    render(<CommentBox postId={"id"} />);
  });

  it("Renders user profile picture", () => {
    expect(screen.getByTestId("profile-pic")).toBeInTheDocument();
  });

  it("Renders the input box", () => {
    expect(screen.getByTestId("input")).toBeInTheDocument();
  });

  it("Renders the send button", () => {
    expect(screen.getByTestId("send-button")).toBeInTheDocument();
  });
});
