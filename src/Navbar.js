import React, { useContext, useState } from "react";
import { Context } from "./Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase.js";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful
        navigate("/login");
        console.log("Signed out successfully.");
      })
      .catch((error) => {
        // Error occurred
      });
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light transparent-navbar">
      <Link to="/" className="navbar-brand">Home</Link>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleNav}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse mx-auto ${isNavOpen ? "show" : ""}`}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/devicelist" className="nav-link">Device Tests</Link>
          </li>
          <li className="nav-item">
            <Link to="/demo" className="nav-link">Add Test</Link>
          </li>
        </ul>
      </div>
      {user && (
        <button onClick={handleLogout} className="btn btn-primary">
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
