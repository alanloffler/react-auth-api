// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@core/providers/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ThemeProvider defaultTheme="dark" storageKey="react-auth-api-theme">
    <App />
  </ThemeProvider>,
  // </StrictMode>,
);
