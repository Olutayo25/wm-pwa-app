// src/ProductsSoldForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { saveDataLocally } from './storage';

const ProductsSoldForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    product: '',
    quantity: '',
    unit: 'pcs',
    amount: '',
  });

  const productsOptions = ['Rice', 'Beans', 'Flour', 'Sugar', 'Salt', 'Oil', 'Spices'];
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
        <h2>Products Sold to Restaurant</h2>
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

          {/* Product Dropdown */}
          <div className="form-row">
            <label>Product</label>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              required
            >
              <option value="">Select Product</option>
              {productsOptions.map((product, i) => (
                <option key={i} value={product}>
                  {product}
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


          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsSoldForm;