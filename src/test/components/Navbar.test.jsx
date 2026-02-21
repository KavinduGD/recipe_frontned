import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Navbar from "../../component/Navbar";
import PropTypes from "prop-types";

// Mock the logo import
vi.mock("../../images/logo.png", () => ({
  default: "mocked-logo.png",
}));

// Wrapper component for Router context
const RouterWrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

RouterWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

describe("Navbar Component", () => {
  beforeEach(() => {
    // Reset window.location.reload mock
    window.location.reload = vi.fn();
  });

  it("renders navbar with logo and title", () => {
    render(
      <RouterWrapper>
        <Navbar />
      </RouterWrapper>
    );

    // Check if logo is rendered
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "mocked-logo.png");

    // Check if title is rendered
    const title = screen.getByText("Recipe Blog");
    expect(title).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(
      <RouterWrapper>
        <Navbar />
      </RouterWrapper>
    );

    // Check for navigation links
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");

    const addRecipeLink = screen.getByRole("link", { name: /add recipe/i });
    expect(addRecipeLink).toBeInTheDocument();
    expect(addRecipeLink).toHaveAttribute("href", "/add-recipe");
  });

  it("calls window.location.reload when refresh button is clicked", () => {
    render(
      <RouterWrapper>
        <Navbar />
      </RouterWrapper>
    );

    const refreshButton = screen.getByRole("button");
    fireEvent.click(refreshButton);

    expect(window.location.reload).toHaveBeenCalledOnce();
  });

  it("applies correct styling to navigation links", () => {
    render(
      <RouterWrapper>
        <Navbar />
      </RouterWrapper>
    );

    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toHaveClass("flex", "justify-center");
  });
});
