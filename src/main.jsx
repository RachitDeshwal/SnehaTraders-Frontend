import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
export const serverURL = "https://sneha-traders-backend.vercel.app/";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext.jsx";
import ShopContext from "./contexts/ShopContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserContextProvider>
      <ShopContext>
        <App />
      </ShopContext>
    </UserContextProvider>
  </BrowserRouter>
);
