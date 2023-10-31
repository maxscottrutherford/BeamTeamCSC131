import './App.css';
import { Demo } from './Routes/Demo';
import DevicePage from './Routes/DeviceListPage';
import Signup from './Routes/Signup';
import Login from './Routes/Login';
import { NoMatch } from './Routes/NoMatch';
import { Home } from './Routes/Home';
import { About } from './Routes/About';
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
import { AuthContext } from './Context/AuthContext';
import { Protected } from './Routes/Protected';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';



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
  }, []);
  
  return (
    <div>
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
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
      </nav> */}
    
    
      
   {/* <nav class="navbar">
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
        <p onClick={handleLogout} class="navlistitem" id="logout-button">
          Logout
        </p>
    </nav>  */}
      
      <Routes>
        <Route path='/' element={<Protected><Home /></Protected>} />
        <Route path='/about' element={<Protected><About /></Protected>} />
        <Route path='/devicelist' element={<Protected><DevicePage /></Protected>} />
        <Route path='/demo' element={<Protected><Demo/></Protected>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </div>
  );
}

/* Main App (Landing Page for everything) */
/* Testing comment */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthContext>
          <Router>
            <Navbar />
            <AppLayout />
          </Router>
         </AuthContext>
      </header>
    </div>
  );
}

export default App;
