import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import SingleRecipe from "./pages/SingleRecipe";
import EditRecipe from "./pages/EditRecipe";
import { useAuthContext } from "@asgardeo/auth-react";

function App() {
  const { state } = useAuthContext();

  return (
    <BrowserRouter>
      <Navbar />
      <div className="w-full sm:w-[1000px] ml-auto mr-auto px-4 mt-6">
        {state.isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
            <Route path="/recipe/:id" element={<SingleRecipe />} />
            <Route path="/edit-recipe/:id" element={<EditRecipe />} />
            <Route
              path="/manage"
              element={
                <p className="mt-[30px] text-center text-[40px] font-bold text-red-700">
                  Just a dummy page
                </p>
              }
            />
          </Routes>
        ) : (
          <div className="mt-[100px] flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold text-[#3d2d30] mb-4">
              Welcome to Recipe Blog
            </h1>
            <p className="text-xl text-gray-600">
              Please log in to view and manage recipes.
            </p>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
