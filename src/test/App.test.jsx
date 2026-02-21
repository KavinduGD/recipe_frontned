import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "../App";

// Mock all the page components
vi.mock("../pages/Home", () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock("../pages/AddRecipe", () => ({
  default: () => <div data-testid="add-recipe-page">Add Recipe Page</div>,
}));

vi.mock("../pages/SingleRecipe", () => ({
  default: () => <div data-testid="single-recipe-page">Single Recipe Page</div>,
}));

vi.mock("../pages/EditRecipe", () => ({
  default: () => <div data-testid="edit-recipe-page">Edit Recipe Page</div>,
}));

// Mock Navbar component
vi.mock("../component/Navbar", () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}));

describe("App Component", () => {
  it("renders without crashing", () => {
    render(<App />);

    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });

  it("renders home page by default", () => {
    render(<App />);

    const homePage = screen.getByTestId("home-page");
    expect(homePage).toBeInTheDocument();
  });

  it("applies correct CSS classes to main container", () => {
    render(<App />);

    // Find the main container div
    const mainContainer = screen.getByTestId("home-page").parentElement;
    expect(mainContainer).toHaveClass(
      "w-full",
      "sm:w-[1000px]",
      "ml-auto",
      "mr-auto"
    );
  });
});
