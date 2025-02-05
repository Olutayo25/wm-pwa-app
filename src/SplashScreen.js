// SplashScreen.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png'; // Replace with your business logo

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/main'); // Redirect to the main page after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <img src={logo} alt="Business Logo" style={{ width: '200px', height: 'auto' }} />
    </div>
  );
};

export default SplashScreen;