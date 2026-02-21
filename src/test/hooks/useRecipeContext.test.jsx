import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useRecipeContext } from "../../hooks/useRecipeContext";
import { RecipeContext } from "../../context/recipeContext";
import PropTypes from "prop-types";

// Mock context provider wrapper
const MockContextProvider = ({ children, value }) => (
  <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
);

MockContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.object.isRequired,
};

describe("useRecipeContext Hook", () => {
  it("should return context value when used within provider", () => {
    const mockContextValue = {
      recipes: [],
      dispatch: vi.fn(),
    };

    const { result } = renderHook(() => useRecipeContext(), {
      wrapper: ({ children }) => (
        <MockContextProvider value={mockContextValue}>
          {children}
        </MockContextProvider>
      ),
    });

    expect(result.current).toEqual(mockContextValue);
  });

  it("should throw error when used outside provider", () => {
    // Mock console.error to avoid error output in test
    const originalError = console.error;
    console.error = vi.fn();

    expect(() => {
      renderHook(() => useRecipeContext());
    }).toThrow("User Context must be used within a UserContextProvider");

    // Restore console.error
    console.error = originalError;
  });

  it("should return updated context value when context changes", () => {
    const initialValue = {
      recipes: [],
      dispatch: vi.fn(),
    };

    const updatedValue = {
      recipes: [{ id: 1, name: "Test Recipe" }],
      dispatch: vi.fn(),
    };

    let contextValue = initialValue;

    const { result, rerender } = renderHook(() => useRecipeContext(), {
      wrapper: ({ children }) => (
        <MockContextProvider value={contextValue}>
          {children}
        </MockContextProvider>
      ),
    });

    expect(result.current).toEqual(initialValue);

    // Update context value and rerender
    contextValue = updatedValue;
    rerender();

    expect(result.current).toEqual(updatedValue);
  });
});
