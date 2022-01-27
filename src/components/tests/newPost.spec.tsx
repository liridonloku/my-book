import { render, screen } from "@testing-library/react";
import NewPost from "../NewPost";

describe("New post component", () => {
  beforeEach(() => {
    render(<NewPost />);
  });
  it("Renders the 'input' box", () => {
    expect(screen.getByText(/What's on your mind/i)).toBeInTheDocument();
  });

  it("Renders the 'Live Video' button", () => {
    expect(screen.getByText(/Live Video/i)).toBeInTheDocument();
  });

  it("Renders the 'Photo' button", () => {
    expect(screen.getByText(/Photo/i)).toBeInTheDocument();
  });

  it("Renders the 'Feeling' button", () => {
    expect(screen.getByText(/Feeling/i)).toBeInTheDocument();
  });
});
