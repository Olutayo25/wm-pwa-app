// src/SyncPage.js
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const SyncPage = () => {
  return (
    <div className="main-page">
      <Header />
      <div className="form-container">
        <h2>Sync Data</h2>
        <p>Syncing data to Google Sheets...</p>
      </div>
      <Footer />
    </div>
  );
};

export default SyncPage;