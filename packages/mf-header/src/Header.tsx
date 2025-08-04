import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h2>🚀 Micro Frontend</h2>
        </div>
        <nav className="navigation">
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="btn-login">Login</button>
          <button className="btn-signup">Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
