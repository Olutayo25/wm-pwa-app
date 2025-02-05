// src/RawMaterialsForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { saveDataLocally, getSubmission, updateSubmission, deleteSubmission } from './storage';

const RawMaterialsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL for editing
  const [formData, setFormData] = useState({
    date: '',
    materials: [{ material: '', quantity: '', unit: 'kg', purpose: '' }],
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

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMaterials = [...formData.materials];
    updatedMaterials[index][name] = value;
    setFormData({ ...formData, materials: updatedMaterials });
  };

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addMaterialRow = () => {
    setFormData({
      ...formData,
      materials: [...formData.materials, { material: '', quantity: '', unit: 'kg', purpose: '' }],
    });
  };

  const removeMaterialRow = (index) => {
    const updatedMaterials = formData.materials.filter((_, i) => i !== index);
    setFormData({ ...formData, materials: updatedMaterials });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submission = { ...formData, formType: 'raw-materials' }; // Add formType
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
        <h2>{id ? 'Edit Raw Materials Requisition' : 'Raw Materials Requisition'}</h2>
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

          {/* Dynamic Materials Section */}
          {formData.materials.map((material, index) => (
            <div key={index} className="form-row">
              <h3>Material {index + 1}</h3>

              {/* Material Dropdown */}
              <div className="form-row">
                <label>Material</label>
                <select
                  name="material"
                  value={material.material}
                  onChange={(e) => handleChange(index, e)}
                  required
                >
                  <option value="">Select Material</option>
                  {materialsOptions.map((materialOption, i) => (
                    <option key={i} value={materialOption}>
                      {materialOption}
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
                    value={material.quantity}
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                </div>
                <div className="unit-field">
                  <label>Unit</label>
                  <select
                    name="unit"
                    value={material.unit}
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

              {/* Purpose Field */}
              <div className="form-row">
                <label>Purpose</label>
                <input
                  type="text"
                  name="purpose"
                  value={material.purpose}
                  onChange={(e) => handleChange(index, e)}
                  required
                />
              </div>

              {/* Remove Row Button */}
              {index > 0 && (
                <button type="button" onClick={() => removeMaterialRow(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}

          {/* Add Material Button */}
          <button type="button" onClick={addMaterialRow}>
            Add Material
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

export default RawMaterialsForm;