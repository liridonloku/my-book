import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("Renders the App Icon", () => {
    expect(screen.getByText(/M/)).toBeInTheDocument();
  });

  it("Renders the home button", () => {
    expect(screen.getByTestId(/home/i)).toBeInTheDocument();
  });

  it("Renders the People button", () => {
    expect(screen.getByTestId(/people/i)).toBeInTheDocument();
  });
});
