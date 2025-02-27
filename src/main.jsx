import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProviders from "./context/AuthProviders.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviders>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProviders>
  </StrictMode>
);
