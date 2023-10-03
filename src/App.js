import './App.css';
import { Demo } from './Demo';
import Navbar from "./Navbar";
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
  useParams,
  useNavigate } from 'react-router-dom';

  function Home() {
    return (
      <div className="home-page">
        <h2>Home/Landing Page</h2>
        <p>Random text for now</p>
      </div>
    );
  }

  function About() {
    return (
      <div className="about-page">
        <h2>About Page</h2>
        <p>
          CSUS 131 Fall 2023 project using Vendia to build a web app
          to manage devices and tests for those devices
        </p>
        <br/>
        <h3>Created by N. Ramones, G. Arellano, M. Burhan, M. El Attar, A. Mahmood, M. Rutherford</h3>
      </div>
    );
  }

  function DeviceList() {
    return (
      <div className='device-list-page'>
        <h2>Device List Page</h2>
        <p>Devices pulled from Vendia API will be on this page</p>
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

  function AppLayout() {
    return (
      <>
        <nav style={{ margin: 10 }}>
          <Link to="/" style={{ padding: 5 }}>
            Home
          </Link>
          <Link to="/about" style={{ padding: 5 }}>
            About
          </Link>
          <Link to='/devicelist' style={{ padding: 5 }}>
            Device List
          </Link>
          <Link to='/demo' style={{ padding: 5 }}>
            Add Device
          </Link>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/devicelist' element={<DeviceList />} />
          <Route path='/demo' element={<Demo />} />
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </>
    );
  }

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <AppLayout/>
        </Router>
      </header>
    </div>
  );
}

export default App;
