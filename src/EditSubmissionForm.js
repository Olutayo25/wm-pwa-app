import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { getSubmission, updateSubmission } from './storage';

const EditSubmissionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    invoiceNumber: '',
    rawMaterials: [{ rawMaterial: '', quantity: '', unit: 'kg', amount: '' }],
  });

  const rawMaterialsOptions = ['Rice', 'Beans', 'Flour', 'Sugar', 'Salt', 'Oil', 'Spices'];
  const units = ['kg', 'pcs', 'ltrs'];

  useEffect(() => {
    const fetchData = async () => {
      const submission = await getSubmission(id);
      if (submission) {
        setFormData(submission);
      }
    };
    fetchData();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSubmission(id, formData);
    navigate('/submissions');
  };

  return (
    <div className="form-container">
      <h2>Edit Submission</h2>
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

        {/* Invoice Number Field */}
        <div className="form-row">
          <label>Invoice Number (Optional)</label>
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleGeneralChange}
          />
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

            {/* Quantity Input */}
            <div className="form-row">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={rawMaterial.quantity}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>

            {/* Unit Dropdown */}
            <div className="form-row">
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
          </div>
        ))}

        {/* Save Changes Button */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditSubmissionForm;