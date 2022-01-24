import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("Renders the App Icon", () => {
    expect(screen.getByText(/M/i)).toBeInTheDocument();
  });

  it("Renders the home button", () => {
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  it("Renders the People button", () => {
    expect(screen.getByText(/People/i)).toBeInTheDocument();
  });

  it("Renders the People button", () => {
    expect(screen.getByText(/People/i)).toBeInTheDocument();
  });
});
