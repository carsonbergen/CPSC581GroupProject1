import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { DataProvider } from "./DataContext.tsx";
import { MouseProvider } from "./MouseContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DataProvider>
      <MouseProvider>
        <App />
      </MouseProvider>
    </DataProvider>
  </StrictMode>
);
