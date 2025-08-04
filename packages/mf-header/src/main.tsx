import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header.tsx";
import "./index.css";

// For standalone development
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div style={{ padding: "20px" }}>
      <h1>Header Micro Frontend - Standalone Mode</h1>
      <Header />
    </div>
  </React.StrictMode>
);
