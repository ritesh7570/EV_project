import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="navbar-title">⚡ EV Dashboard</h2>
      <ul className="nav-links">
        <li><a href="#summary">Summary</a></li>
        <li><a href="#top-brands">Top Brands</a></li>
        <li><a href="#type-chart">EV Types</a></li>
        <li><a href="#trend">Trends</a></li>
        <li><a href="#cities">Cities</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
