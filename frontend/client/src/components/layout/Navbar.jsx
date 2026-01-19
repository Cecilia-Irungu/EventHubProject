import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          EventHub
        </Link>

        <div className="navbar-links">
          <Link to="/events">Events</Link>
          <Link to="/create-event">Create Event</Link>
        </div>

        <div className="navbar-auth">
          <Link to="/login">Login</Link>
          <Button variant="primary" size="medium">
            Register
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;