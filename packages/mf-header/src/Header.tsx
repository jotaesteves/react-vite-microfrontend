import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-br from-neutral-800 to-red-700 text-white py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-8">
        <div className="logo">
          <h2 className="text-2xl font-bold m-0">🚀 Micro Frontend</h2>
        </div>
        <nav className="navigation">
          <ul className="flex list-none gap-8 m-0 p-0">
            <li>
              <a
                href="#home"
                className="text-white no-underline font-medium hover:opacity-80 transition-opacity duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-white no-underline font-medium hover:opacity-80 transition-opacity duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="text-white no-underline font-medium hover:opacity-80 transition-opacity duration-300"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-white no-underline font-medium hover:opacity-80 transition-opacity duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-transparent text-white border-2 border-white rounded font-medium cursor-pointer transition-all duration-300 hover:bg-white hover:text-neutral-800">
            Login
          </button>
          <button className="px-4 py-2 bg-neutral-800 text-white border-none rounded font-medium cursor-pointer transition-all duration-300 hover:bg-neutral-200 hover:-translate-y-0.5 hover:text-black">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
