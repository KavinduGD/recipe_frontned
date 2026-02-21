import { describe, it, expect } from "vitest";
import { recipeReducer } from "../../context/recipeContext";

describe("Recipe Reducer", () => {
  const initialState = {
    recipes: [],
  };

  const sampleRecipes = [
    {
      _id: "1",
      name: "Test Recipe 1",
      ingredients: ["ingredient1", "ingredient2"],
      description: "Test description 1",
    },
    {
      _id: "2",
      name: "Test Recipe 2",
      ingredients: ["ingredient3", "ingredient4"],
      description: "Test description 2",
    },
  ];

  it("should set recipes with SET_RECIPES action", () => {
    const action = {
      type: "SET_RECIPES",
      payload: sampleRecipes,
    };

    const result = recipeReducer(initialState, action);

    expect(result).toEqual({
      recipes: sampleRecipes,
    });
  });

  it("should add a recipe with ADD_RECIPE action", () => {
    const stateWithRecipes = {
      recipes: [sampleRecipes[0]],
    };

    const newRecipe = {
      _id: "3",
      name: "New Recipe",
      ingredients: ["new ingredient"],
      description: "New description",
    };

    const action = {
      type: "ADD_RECIPE",
      payload: newRecipe,
    };

    const result = recipeReducer(stateWithRecipes, action);

    expect(result.recipes).toHaveLength(2);
    expect(result.recipes).toContain(newRecipe);
    expect(result.recipes).toContain(sampleRecipes[0]);
  });

  it("should delete a recipe with DELETE_RECIPE action", () => {
    const stateWithRecipes = {
      recipes: sampleRecipes,
    };

    const action = {
      type: "DELETE_RECIPE",
      payload: "1",
    };

    const result = recipeReducer(stateWithRecipes, action);

    expect(result.recipes).toHaveLength(1);
    expect(result.recipes[0]._id).toBe("2");
    expect(result.recipes.find((recipe) => recipe._id === "1")).toBeUndefined();
  });

  it("should update a recipe with UPDATE_RECIPE action", () => {
    const stateWithRecipes = {
      recipes: sampleRecipes,
    };

    const updatedRecipe = {
      _id: "1",
      name: "Updated Recipe Name",
      ingredients: ["updated ingredient"],
      description: "Updated description",
    };

    const action = {
      type: "UPDATE_RECIPE",
      payload: updatedRecipe,
    };

    const result = recipeReducer(stateWithRecipes, action);

    expect(result.recipes).toHaveLength(2);
    expect(result.recipes[0]).toEqual(updatedRecipe);
    expect(result.recipes[1]).toEqual(sampleRecipes[1]);
  });

  it("should return current state for unknown action type", () => {
    const action = {
      type: "UNKNOWN_ACTION",
      payload: "some data",
    };

    const result = recipeReducer(initialState, action);

    expect(result).toEqual(initialState);
  });

  it("should handle empty state", () => {
    const action = {
      type: "DELETE_RECIPE",
      payload: "1",
    };

    const result = recipeReducer(initialState, action);

    expect(result.recipes).toHaveLength(0);
  });
});
