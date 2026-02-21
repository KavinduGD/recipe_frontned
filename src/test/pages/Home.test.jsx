import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Home from "../../pages/Home";
import { RecipeContext } from "../../context/recipeContext";
import PropTypes from "prop-types";

// Mock dependencies
vi.mock("../../baseUrl", () => ({
  default: {
    delete: vi.fn(),
  },
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Test wrapper with context and router
const TestWrapper = ({ children, contextValue }) => (
  <BrowserRouter>
    <RecipeContext.Provider value={contextValue}>
      {children}
    </RecipeContext.Provider>
  </BrowserRouter>
);

TestWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  contextValue: PropTypes.object.isRequired,
};

describe("Home Component", () => {
  const mockDispatch = vi.fn();

  const mockRecipes = [
    {
      _id: "1",
      name: "Test Recipe 1",
      description: "Test description 1",
      image: { filePath: "http://test-image1.jpg" },
    },
    {
      _id: "2",
      name: "Test Recipe 2",
      description: "Test description 2",
      image: { filePath: "http://test-image2.jpg" },
    },
  ];

  const defaultContextValue = {
    recipes: mockRecipes,
    dispatch: mockDispatch,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.confirm
    window.confirm = vi.fn();
  });

  it("renders recipe list when recipes are available", () => {
    render(
      <TestWrapper contextValue={defaultContextValue}>
        <Home />
      </TestWrapper>
    );

    // Check if recipe names are displayed
    expect(screen.getByText("Test Recipe 1")).toBeInTheDocument();
    expect(screen.getByText("Test Recipe 2")).toBeInTheDocument();
  });

  it("renders empty state when no recipes available", () => {
    const emptyContextValue = {
      recipes: [],
      dispatch: mockDispatch,
    };

    render(
      <TestWrapper contextValue={emptyContextValue}>
        <Home />
      </TestWrapper>
    );

    // Check for add recipe button which should be present
    const addButton = screen.getByRole("button");
    expect(addButton).toBeInTheDocument();
  });

  it("navigates to add recipe page when add button is clicked", () => {
    render(
      <TestWrapper contextValue={defaultContextValue}>
        <Home />
      </TestWrapper>
    );

    const addButton = screen.getByText("Add a Recipe");
    fireEvent.click(addButton);

    expect(mockNavigate).toHaveBeenCalledWith("/add-recipe");
  });

  it("shows delete confirmation dialog when delete button is clicked", () => {
    window.confirm.mockReturnValue(false);

    render(
      <TestWrapper contextValue={defaultContextValue}>
        <Home />
      </TestWrapper>
    );

    // Find delete buttons (assuming there are delete buttons in the component)
    const deleteButtons = screen.getAllByText(/delete/i);
    if (deleteButtons.length > 0) {
      fireEvent.click(deleteButtons[0]);
      expect(window.confirm).toHaveBeenCalledWith(
        "Are you sure you want to delete this recipe?"
      );
    }
  });

  it("renders recipe images with correct src attributes", () => {
    render(
      <TestWrapper contextValue={defaultContextValue}>
        <Home />
      </TestWrapper>
    );

    const recipeImages = screen.getAllByAltText("recipe image");

    expect(recipeImages.length).toBeGreaterThan(0);
    expect(recipeImages[0]).toHaveAttribute("src", "http://test-image1.jpg");
    expect(recipeImages[1]).toHaveAttribute("src", "http://test-image2.jpg");
  });

  it("renders links to individual recipe pages", () => {
    render(
      <TestWrapper contextValue={defaultContextValue}>
        <Home />
      </TestWrapper>
    );

    // Check for links that should navigate to recipe detail pages
    const links = screen.getAllByRole("link");
    const recipeLinks = links.filter((link) =>
      link.getAttribute("href")?.includes("/recipe/")
    );

    expect(recipeLinks.length).toBeGreaterThan(0);
  });
});
