// ConfirmationPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const ConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Form Submitted Successfully!</h2>
      <button onClick={() => navigate('/submissions')}>View Submissions</button>
      <button onClick={() => navigate('/main')}>Back to Main Page</button>
    </div>
  );
};

export default ConfirmationPage;