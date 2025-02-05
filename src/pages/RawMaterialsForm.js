// src/RawMaterialsForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { saveDataLocally } from './storage';

const RawMaterialsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    material: '',
    quantity: '',
    unit: 'kg',
    purpose: '',
  });

  const materialsOptions = ['Rice', 'Beans', 'Flour', 'Sugar', 'Salt', 'Oil', 'Spices'];
  const units = ['kg', 'pcs', 'ltrs'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveDataLocally(formData);
    navigate('/confirmation');
  };

  return (
    <div className="main-page">
      <Header />
      <div className="form-container">
        <h2>Raw Materials Requisition</h2>
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
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RawMaterialsForm;