// SyncButton.js
import React from 'react';
import { syncData } from './storage'; // Function to sync data

const SyncButton = () => {
  const handleSync = async () => {
    await syncData();
    alert('Data synced successfully!');
  };

  return (
    <div>
      <button onClick={handleSync}>Sync Data</button>
    </div>
  );
};

export default SyncButton;