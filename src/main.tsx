import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeProvider } from "./context/ThemeContext";
import { router } from "./router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            <FavoritesProvider>
                <RouterProvider router={router} />
            </FavoritesProvider>
        </ThemeProvider>
    </React.StrictMode>
);
