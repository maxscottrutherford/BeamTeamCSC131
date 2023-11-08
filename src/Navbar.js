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
            <Link to="/devicelist" className="nav-link">Device List</Link>
          </li>
          <li className="nav-item">
            <Link to="/demo" className="nav-link">Add Device</Link>
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





/*import React, { useContext } from "react";
import { Context } from "./Context/AuthContext";
import { signOut } from 'firebase/auth';
import { auth } from './firebase.js';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const { user } = useContext(Context);

    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() =>{
          //sign-out successful
          navigate('/login');
          console.log("Signed out successfully.")
        }).catch((error) => {
          //error occured
        });
      }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between transparent-navbar">
            {user ? (
                <>
                    <Link to="/" className="navbar-brand">Home</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse mx-auto" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <Link to="/about" className="nav-link">About</Link>
                        </li>
                        <li className="nav-item">
                        <Link to='/devicelist' className="nav-link">Device List</Link>
                        </li>
                        <li className="nav-item">
                        <Link to='/demo' className="nav-link">Add Device</Link>
                        </li>
                    </ul>
                    </div>
                    <button onClick={handleLogout} className="btn btn-primary">
                    Logout
                    </button>
                </>
            ) : null}
        </nav>
    );
};

export default Navbar;
*/
