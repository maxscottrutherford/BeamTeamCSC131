import './App.css';
import { Demo } from './Demo';
import DevicePage from './DeviceListPage';
import Signup from './Signup';
import Login from './Login';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase.js';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
  useParams,
  useNavigate,
  Redirect
} from 'react-router-dom';

/* Home Page */
function Home() {
  return (
    <div className="home-page">
      <h2>Home/Landing Page</h2>
      <p>Random text for now</p>
    </div>
  );
}

/* About Page */
function About() {
  return (
    <div className="about-page">
      <h2>About Page</h2>
      <p>
        CSUS 131 Fall 2023 project using Vendia to build a web app
        to manage devices and tests for those devices
      </p>
      <br />
      <h3>Created by N. Ramones, G. Arellano, M. Burhan, M. El Attar, A. Mahmood, M. Rutherford</h3>
    </div>
  );
}

function DeviceList() {
  return (
    <div className='device-list-page'>
      <h2>Device List Page</h2>
      <DevicePage />
    </div>
  );
}

/*
  Device Adding page is Demo, will change the name later
*/

function NoMatch() {
  return (
    <div className='404-page'>
      <h2>404: Page Not Found</h2>
      <p>The web page you have tried to reach is not available.</p>
    </div>
  )
}

/* Main page for routing to different pages */
function AppLayout() {
  const navigate = useNavigate();
  //function to handle logout
  const handleLogout = () => {
    signOut(auth).then(() =>{
      //sign-out successful
      navigate('/login');
      console.log("Signed out successfully.")
    }).catch((error) => {
      //error occured
    });
  }

  //getting user info
  useEffect(() =>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //user is signed in
        const uid=user.uid;
        console.log("uid", uid)
      } else {
        //User is signed out
        console.log("user is logged out")
      }
    });
  }, [])
  
  return (
    <>
      <nav class="navbar">
        <Link to="/"  class="navlistitem">
          Home
        </Link>
        <Link to="/about" class="navlistitem">
          About
        </Link>
        <Link to='/devicelist' class="navlistitem">
          Device List
        </Link>
        <Link to='/demo' class="navlistitem">
          Add Device
        </Link>
        <Link to='/login' class="navlistitem">
          Login
        </Link>
        <button onClick={handleLogout} >
          Logout
        </button>
      </nav>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/devicelist' element={<DeviceList />} />
        <Route path='/demo' element={<Demo />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </>
  );
}

/* Main App (Landing Page for everything) */
/* Testing comment */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <AppLayout />
        </Router>
      </header>
    </div>
  );
}

export default App;
