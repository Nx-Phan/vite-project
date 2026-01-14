import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/eyeglasses.svg";
import uploadIcon from "../assets/arrow-bar-up.svg";
import profileIcon from "../assets/person-circle.svg";
import loginIcon from "../assets/login.svg";

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

        <Link to="/login" className="icon-button">
          <img src={loginIcon} alt="Login" />
        </Link>

        <Link to="/profile" className="icon-button">
          <img src={profileIcon} alt="Profile" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
