import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();

  const forms = [
    { title: 'Supplier/Market Purchase Record', path: '/supplier-purchase' },
    { title: 'Raw Materials Requisition', path: '/raw-materials' },
    { title: 'Products Sold to Restaurant', path: '/products-sold' },
    { title: 'Wastage/Damage Report', path: '/wastage-damage' },
    { title: 'Material Usage', path: '/material-usage' },
  ];

  return (
    <div className="main-page">
      <Header />
      <div className="form-cards">
        {forms.map((form, index) => (
          <div
            key={index}
            className="form-card"
            onClick={() => navigate(form.path)}
          >
            <h3>{form.title}</h3>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;