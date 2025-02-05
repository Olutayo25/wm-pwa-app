// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="main-footer">
      <p>&copy; {new Date().getFullYear()} Your Business Name. All rights reserved.</p>
    </footer>
  );
};

export default Footer;