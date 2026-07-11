//main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./patchDomForTranslateExtensions";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./user/components/error/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
);
