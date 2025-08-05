import React from "react";
import "./Footer.css";
import { useTheme, useNavigation } from "./store/microFrontendStore";

const Footer: React.FC = () => {
  const { theme, isDark } = useTheme();
  const { currentPage, navigateTo } = useNavigation();

  const handleFooterNavClick = (page: string, event: React.MouseEvent) => {
    event.preventDefault();
    navigateTo(page);
  };

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-container">
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li>
              <a
                href="#about"
                onClick={(e) => handleFooterNavClick("about", e)}
                className={currentPage === "about" ? "active" : ""}
              >
                About Us
              </a>
            </li>
            <li>
              <a href="#careers">Careers</a>
            </li>
            <li>
              <a href="#news">News</a>
            </li>
            <li>
              <a href="#investor">Investor Relations</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li>
              <a href="#help">Help Center</a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => handleFooterNavClick("contact", e)}
                className={currentPage === "contact" ? "active" : ""}
              >
                Contact Us
              </a>
            </li>
            <li>
              <a href="#status">Status</a>
            </li>
            <li>
              <a href="#community">Community</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#terms">Terms of Service</a>
            </li>
            <li>
              <a href="#cookies">Cookie Policy</a>
            </li>
            <li>
              <a href="#licenses">Licenses</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-links">
            <a href="#twitter" className="social-link">
              🐦 Twitter
            </a>
            <a href="#linkedin" className="social-link">
              💼 LinkedIn
            </a>
            <a href="#github" className="social-link">
              🐱 GitHub
            </a>
            <a href="#discord" className="social-link">
              💬 Discord
            </a>
          </div>
          <div className="theme-info">
            <small>Theme: {isDark ? "🌙 Dark" : "☀️ Light"}</small>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Micro Frontend Architecture. All rights reserved.</p>
        <p>Built with React + Vite + Module Federation + Zustand</p>
        <small>Current page: {currentPage}</small>
      </div>
    </footer>
  );
};

export default Footer;
