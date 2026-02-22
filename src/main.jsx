import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RecipeContextProvider } from "./context/recipeContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@asgardeo/auth-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider
      config={{
        signInRedirectURL:
          "https://436f4379-7f55-44b5-b30e-7c69c9573686.e1-us-east-azure.choreoapps.dev",
        signOutRedirectURL:
          "https://436f4379-7f55-44b5-b30e-7c69c9573686.e1-us-east-azure.choreoapps.dev",
        clientID: "vJ2jW4UQGN95ugrfEzlyde8X3o8a",
        baseUrl: "https://api.asgardeo.io/t/kavinduorg",
        scope: ["openid", "profile"],
      }}
    >
      <RecipeContextProvider>
        <App />
        <ToastContainer />
      </RecipeContextProvider>
    </AuthProvider>
  </React.StrictMode>,
);
