import axios from "axios";

const recipeAxios = axios.create({
  baseURL:
    "https://3ff6d494-4911-4fd6-9a0b-75b731ad9b18-prod.e1-us-east-azure.choreoapis.dev/default/recipe-backend/v1.0",
});

export default recipeAxios;
