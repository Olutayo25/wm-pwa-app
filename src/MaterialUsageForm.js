// src/MaterialUsageForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { saveDataLocally, getSubmission, updateSubmission, deleteSubmission } from './storage';

const MaterialUsageForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL for editing
  const [formData, setFormData] = useState({
    date: '',
    material: '',
    quantity: '',
    unit: 'kg',
    purpose: '',
  });

  const materialsOptions = ['Rice', 'Beans', 'Flour', 'Sugar', 'Salt', 'Oil', 'Spices'];
  const units = ['kg', 'pcs', 'ltrs'];

  // Load data for editing
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const submission = await getSubmission(Number(id));
        if (submission) {
          setFormData(submission);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submission = { ...formData, formType: 'material-usage' }; // Add formType
    if (id) {
      await updateSubmission(Number(id), submission);
    } else {
      await saveDataLocally(submission);
    }
    navigate('/submissions');
  };

  const handleDelete = async () => {
    if (id) {
      await deleteSubmission(Number(id));
      navigate('/submissions');
    }
  };

  return (
    <div className="main-page">
      <Header />
      <div className="form-container">
        <h2>{id ? 'Edit Material Usage' : 'Material Usage'}</h2>
        <form onSubmit={handleSubmit}>
          {/* Date Field */}
          <div className="form-row">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Material Dropdown */}
          <div className="form-row">
            <label>Material</label>
            <select
              name="material"
              value={formData.material}
              onChange={handleChange}
              required
            >
              <option value="">Select Material</option>
              {materialsOptions.map((material, i) => (
                <option key={i} value={material}>
                  {material}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity and Unit Fields */}
          <div className="form-row quantity-unit-row">
            <div className="quantity-field">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="unit-field">
              <label>Unit</label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
              >
                {units.map((unit, i) => (
                  <option key={i} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Purpose Field */}
          <div className="form-row">
            <label>Purpose</label>
            <input
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit">{id ? 'Save Changes' : 'Submit'}</button>

          {/* Delete Button (only for editing) */}
          {id && (
            <button type="button" onClick={handleDelete} style={{ backgroundColor: 'red', marginLeft: '10px' }}>
              Delete
            </button>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default MaterialUsageForm;