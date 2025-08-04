import React from "react";
import ReactDOM from "react-dom/client";
import Footer from "./Footer.tsx";
import "./index.css";

// For standalone development
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div style={{ padding: "20px" }}>
      <h1>Footer Micro Frontend - Standalone Mode</h1>
      <Footer />
    </div>
  </React.StrictMode>
);
