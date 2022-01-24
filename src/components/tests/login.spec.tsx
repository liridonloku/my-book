import React from "react";
import { render } from "@testing-library/react";
import Login from "../Login";

describe("Login page", () => {
  it("Renders the logo and statement", () => {
    const { getAllByText } = render(<Login />);
    const logo = getAllByText(/MyBook/i);
    expect(logo).toHaveLength(2);
  });

  describe("Renders the login form", () => {
    it("Renders the email and password fields", () => {
      const { getByPlaceholderText } = render(<Login />);
      const email = getByPlaceholderText(/Email/i);
      const password = getByPlaceholderText(/Password/i);
      expect(email).toBeInTheDocument();
      expect(password).toBeInTheDocument();
    });

    it("Renders the login button", () => {
      const { getByText } = render(<Login />);
      const form = getByText(/Log In/i);
      expect(form).toBeInTheDocument();
    });

    it("Renders the Create new Account button", () => {
      const { getByText } = render(<Login />);
      const form = getByText(/Create new Account/i);
      expect(form).toBeInTheDocument();
    });
  });
  it("Renders the footer", () => {
    const { getByText } = render(<Login />);
    const footer = getByText(/liridonloku/i);
    expect(footer).toBeInTheDocument();
  });
});
