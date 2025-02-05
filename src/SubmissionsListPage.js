// src/SubmissionsListPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { getSubmissions, deleteSubmission } from './storage';

const SubmissionsListPage = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const data = await getSubmissions();
      setSubmissions(data);
    };
    fetchSubmissions();
  }, []);

  const handleDelete = async (id) => {
    await deleteSubmission(id);
    setSubmissions(submissions.filter((sub) => sub.id !== id));
  };

  // Filter submissions by form type
  const filterSubmissions = (formType) => {
    return submissions.filter((sub) => sub.formType === formType);
  };

  return (
    <div className="main-page">
      <Header />
      <div className="form-container">
        <h2>Submissions</h2>
        <button onClick={() => navigate('/main')}>Back to Main Page</button>

        {/* Supplier/Market Purchase Record */}
        <h3>Raw Materials Purchase Record</h3>
        <ul className="submissions-list">
          {filterSubmissions('supplier-purchase').map((sub) => (
            <li key={sub.id}>
              <span>{sub.date} - {sub.material} - {sub.quantity} {sub.unit}</span>
              <button onClick={() => navigate(`/supplier-purchase/${sub.id}`)}>Edit</button>
              <button onClick={() => handleDelete(sub.id)}>Delete</button>
            </li>
          ))}
        </ul>


        {/* Raw Materials Requisition Submissions */}
        <h3>Raw Materials Requisition</h3>
        <ul className="submissions-list">
          {filterSubmissions('raw-materials').map((sub) => (
            <li key={sub.id}>
              <span>{sub.date} - {sub.material} - {sub.quantity} {sub.unit}</span>
              <button onClick={() => navigate(`/raw-materials/${sub.id}`)}>Edit</button>
              <button onClick={() => handleDelete(sub.id)}>Delete</button>
            </li>
          ))}
        </ul>

        {/* Products Sold to Restaurant Submissions */}
        <h3>Transfer to Restaurant</h3>
        <ul className="submissions-list">
          {filterSubmissions('products-sold').map((sub) => (
            <li key={sub.id}>
              <span>{sub.date} - {sub.product} - {sub.quantity} {sub.unit}</span>
              <button onClick={() => navigate(`/products-sold/${sub.id}`)}>Edit</button>
              <button onClick={() => handleDelete(sub.id)}>Delete</button>
            </li>
          ))}
        </ul>

        {/* Wastage/Damage Report Submissions */}
        <h3>Wastage/Damage Report</h3>
        <ul className="submissions-list">
          {filterSubmissions('wastage-damage').map((sub) => (
            <li key={sub.id}>
              <span>{sub.date} - {sub.item} - {sub.quantity} {sub.unit}</span>
              <button onClick={() => navigate(`/wastage-damage/${sub.id}`)}>Edit</button>
              <button onClick={() => handleDelete(sub.id)}>Delete</button>
            </li>
          ))}
        </ul>

        {/* Material Usage Submissions */}
        <h3>Material Usage</h3>
        <ul className="submissions-list">
          {filterSubmissions('material-usage').map((sub) => (
            <li key={sub.id}>
              <span>{sub.date} - {sub.material} - {sub.quantity} {sub.unit}</span>
              <button onClick={() => navigate(`/material-usage/${sub.id}`)}>Edit</button>
              <button onClick={() => handleDelete(sub.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SubmissionsListPage;