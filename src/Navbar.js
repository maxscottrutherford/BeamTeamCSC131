import React, { useContext } from "react";
import { Context } from "./Context/AuthContext";
import { signOut } from 'firebase/auth';
import { auth } from './firebase.js';
import { Link, useNavigate } from 'react-router-dom';

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
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
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