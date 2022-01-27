import { render, screen } from "@testing-library/react";
import Home from "../Home";

describe("Home", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("Renders the main view", () => {
    expect(screen.getByTestId("main")).toBeInTheDocument();
  });
});
