import React from "react";
import "./Header.css";
import { useNavigation, useTheme } from "./store/microFrontendStore";

const Header: React.FC = () => {
  const { currentPage, navigateTo, isCurrentPage } = useNavigation();
  const { theme, setTheme, isDark } = useTheme();

  const handleNavClick = (page: "home" | "about" | "services" | "contact", event: React.MouseEvent) => {
    event.preventDefault();
    navigateTo(page);
  };

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <header className={`header ${theme}`}>
      <div className="header-container">
        <div className="logo">
          <h2>🚀 Micro Frontend</h2>
        </div>
        <nav className="navigation">
          <ul>
            <li>
              <a
                href="#home"
                className={isCurrentPage("home") ? "active" : ""}
                onClick={(e) => handleNavClick("home", e)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={isCurrentPage("about") ? "active" : ""}
                onClick={(e) => handleNavClick("about", e)}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                className={isCurrentPage("services") ? "active" : ""}
                onClick={(e) => handleNavClick("services", e)}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={isCurrentPage("contact") ? "active" : ""}
                onClick={(e) => handleNavClick("contact", e)}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <button 
            className="btn-theme" 
            onClick={toggleTheme}
            title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <button className="btn-login">Login</button>
          <button className="btn-signup">Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
