import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MicroFrontendProvider } from "./providers/MicroFrontendProvider.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MicroFrontendProvider>
      <App />
    </MicroFrontendProvider>
  </React.StrictMode>
);
