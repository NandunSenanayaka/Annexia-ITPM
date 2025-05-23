import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">ANNEXIA</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact Us</a></li>
      </ul>
      <div>
      <button><a href="/login"> Log In</a></button>

      </div>
    </nav>
  );
};

export default Navbar;