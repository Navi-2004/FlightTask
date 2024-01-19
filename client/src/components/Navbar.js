// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const getUserIdFromLocalStorage = () => {
    // Retrieve user ID from local storage
    return localStorage.getItem('userId');
  };

  const handleLogout = () => {
    // Add logic to handle user logout
    localStorage.removeItem('userId');
    console.log('Logout logic');
    navigate('/');
  };

  const isLoggedIn = getUserIdFromLocalStorage();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="brand">
          <Link to="/" className='lin'>Aero<span>Book</span></Link>
        </div>
        <div className="nav-links">
          <Link to="/booking">Book Flights</Link>
          <Link to="/flight" style={{marginRight:1+"em"}}>View Flights</Link>
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout} style={{marginRight:2+"em"}}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" style={{marginRight:2+"em"}}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
