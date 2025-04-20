import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-title">⚡ EV Dashboard</h2>

      {/* Hamburger Icon */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><a href="#summary" onClick={closeMenu}>Summary</a></li>
        <li><a href="#top-brands" onClick={closeMenu}>Top Brands</a></li>
        <li><a href="#type-chart" onClick={closeMenu}>EV Types</a></li>
        <li><a href="#trend" onClick={closeMenu}>Trends</a></li>
        <li><a href="#cities" onClick={closeMenu}>Cities</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
