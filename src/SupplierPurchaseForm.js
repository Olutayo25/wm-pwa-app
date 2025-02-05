// src/SupplierPurchaseForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { saveDataLocally, getSubmission, updateSubmission, deleteSubmission } from './storage';

const SupplierPurchaseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL for editing
  const [formData, setFormData] = useState({
    date: '',
    supplierName: '',
    invoiceNumber: '',
    rawMaterials: [{ rawMaterial: '', quantity: '', unit: 'kg', amount: '' }],
  });

  const rawMaterialsOptions = ['Rice', 'Beans', 'Flour', 'Sugar', 'Salt', 'Oil', 'Spices'];
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

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRawMaterials = [...formData.rawMaterials];
    updatedRawMaterials[index][name] = value;
    setFormData({ ...formData, rawMaterials: updatedRawMaterials });
  };

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addRawMaterialRow = () => {
    setFormData({
      ...formData,
      rawMaterials: [...formData.rawMaterials, { rawMaterial: '', quantity: '', unit: 'kg', amount: '' }],
    });
  };

  const removeRawMaterialRow = (index) => {
    const updatedRawMaterials = formData.rawMaterials.filter((_, i) => i !== index);
    setFormData({ ...formData, rawMaterials: updatedRawMaterials });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submission = { ...formData, formType: 'supplier-purchase' }; // Add formType
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
        <h2>{id ? 'Edit Supplier/Market Purchase Record' : 'Supplier/Market Purchase Record'}</h2>
        <form onSubmit={handleSubmit}>
          {/* Date Field */}
          <div className="form-row">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleGeneralChange}
              required
            />
          </div>

          {/* Supplier Name and Invoice Number Fields */}
          <div className="form-row supplier-invoice-row">
            <div className="supplier-field">
              <label>Supplier Name</label>
              <input
                type="text"
                name="supplierName"
                value={formData.supplierName}
                onChange={handleGeneralChange}
                required
              />
            </div>
            <div className="invoice-field">
              <label>Invoice Number (Optional)</label>
              <input
                type="text"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleGeneralChange}
              />
            </div>
          </div>

          {/* Dynamic Raw Materials Section */}
          {formData.rawMaterials.map((rawMaterial, index) => (
            <div key={index} className="form-row">
              <h3>Raw Material {index + 1}</h3>

              {/* Raw Material Dropdown */}
              <div className="form-row">
                <label>Raw Material</label>
                <select
                  name="rawMaterial"
                  value={rawMaterial.rawMaterial}
                  onChange={(e) => handleChange(index, e)}
                  required
                >
                  <option value="">Select Raw Material</option>
                  {rawMaterialsOptions.map((material, i) => (
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
                    value={rawMaterial.quantity}
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                </div>
                <div className="unit-field">
                  <label>Unit</label>
                  <select
                    name="unit"
                    value={rawMaterial.unit}
                    onChange={(e) => handleChange(index, e)}
                  >
                    {units.map((unit, i) => (
                      <option key={i} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Amount Input */}
              <div className="form-row">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={rawMaterial.amount}
                  onChange={(e) => handleChange(index, e)}
                  required
                />
              </div>

              {/* Remove Row Button */}
              {index > 0 && (
                <button type="button" onClick={() => removeRawMaterialRow(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}

          {/* Add Raw Material Button */}
          <button type="button" onClick={addRawMaterialRow}>
            Add Raw Material
          </button>

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

export default SupplierPurchaseForm;