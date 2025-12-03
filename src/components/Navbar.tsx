import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/eyeglasses.svg"; // ← your logo
import uploadIcon from "../assets/arrow-bar-up.svg";
import profileIcon from "../assets/person-circle.svg";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-logo">
        <img src={logo} alt="App Logo" />
      </Link>

      <div className="navbar-actions">
        <Link to="/upload" className="icon-button">
          <img src={uploadIcon} alt="Upload Video" />
        </Link>

        <Link to="/profile" className="icon-button">
          <img src={profileIcon} alt="Profile" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
