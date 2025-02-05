// src/components/Header.js
import React from 'react';
import logo from '../logo.png'; // Import your logo file
import Menu from './Menu'; // Import the Menu component

const Header = () => {
  return (
    <header className="main-header">
      <Menu /> {/* Replace the menu icon with the Menu component */}
      <img src={logo} alt="Business Logo" className="logo" />
    </header>
  );
};

export default Header;