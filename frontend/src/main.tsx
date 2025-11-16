import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import { MainRoutes } from "./routes/MainRoutes";
import { ThemeProvider } from "./theme/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <MainRoutes />
    </ThemeProvider>
  </StrictMode>
);
