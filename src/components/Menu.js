// src/components/Menu.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaCircle } from 'react-icons/fa';

const Menu = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine); // Initial online status

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle menu item clicks
  const handleMenuItemClick = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close the menu after navigation
  };

  // Update online status when connectivity changes
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="menu-container">
      {/* Menu Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        <FaBars />
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="menu-dropdown">
          <div className="menu-item" onClick={() => handleMenuItemClick('/main')}>
            Home
          </div>
          <div className="menu-item" onClick={() => handleMenuItemClick('/submissions')}>
            View Submissions
          </div>
          <div className="menu-item" onClick={() => handleMenuItemClick('/sync')}>
            Sync
          </div>

          {/* Status Indicator */}
          <div className="menu-status">
            <FaCircle color={isOnline ? 'green' : 'red'} />
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;