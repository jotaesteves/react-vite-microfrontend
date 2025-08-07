import React from "react";
import "./Footer.css";
import { useTheme, useNavigation } from "./store/microFrontendStore";

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const { currentPage, navigateTo } = useNavigation();

  const handleFooterNavClick = (page: string, event: React.MouseEvent) => {
    event.preventDefault();
    navigateTo(page);
  };

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-tags">
        <span
          className={`footer-tag ${currentPage === "home" ? "active" : ""}`}
          onClick={(e) => handleFooterNavClick("home", e as React.MouseEvent)}
          style={{ display: "inline-flex", alignItems: "center", cursor: "pointer", marginRight: "8px" }}
        >
          Home
          <button
            className="footer-tag-close"
            onClick={(e) => {
              e.stopPropagation();
              // Optionally handle tag close logic here
            }}
            aria-label="Close Home tag"
            type="button"
          >
            ×
          </button>
        </span>
        <span
          className={`footer-tag ${currentPage === "about" ? "active" : ""}`}
          onClick={(e) => handleFooterNavClick("about", e as React.MouseEvent)}
          style={{ display: "inline-flex", alignItems: "center", cursor: "pointer", marginRight: "8px" }}
        >
          About
          <button
            className="footer-tag-close"
            onClick={(e) => {
              e.stopPropagation();
              // Optionally handle tag close logic here
            }}
            aria-label="Close About tag"
            type="button"
          >
            ×
          </button>
        </span>
        <span
          className={`footer-tag ${currentPage === "contact" ? "active" : ""}`}
          onClick={(e) => handleFooterNavClick("contact", e as React.MouseEvent)}
          style={{ display: "inline-flex", alignItems: "center", cursor: "pointer" }}
        >
          Contact
          <button
            className="footer-tag-close"
            onClick={(e) => {
              e.stopPropagation();
              // Optionally handle tag close logic here
            }}
            aria-label="Close Contact tag"
            type="button"
          >
            ×
          </button>
        </span>
      </div>
      <div className="footer-chat">
        <button
          className="footer-chat-button"
          onClick={() => {
            // Handle chat button click logic here
            console.log("Chat button clicked");
          }}
          aria-label="Open chat"
        >
          💬 Go<span style={{ fontWeight: "bold" }}>IZI</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
