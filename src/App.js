// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './SplashScreen';
import MainPage from './MainPage';
import SupplierPurchaseForm from './SupplierPurchaseForm';
import RawMaterialsForm from './RawMaterialsForm';
import ProductsSoldForm from './ProductsSoldForm';
import WastageDamageForm from './WastageDamageForm';
import MaterialUsageForm from './MaterialUsageForm';
import ConfirmationPage from './ConfirmationPage';
import SubmissionsListPage from './SubmissionsListPage';
import EditSubmissionForm from './EditSubmissionForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/supplier-purchase" element={<SupplierPurchaseForm />} />
        <Route path="/raw-materials" element={<RawMaterialsForm />} />
        <Route path="/products-sold" element={<ProductsSoldForm />} />
        <Route path="/wastage-damage" element={<WastageDamageForm />} />
        <Route path="/material-usage" element={<MaterialUsageForm />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/submissions" element={<SubmissionsListPage />} />
        <Route path="/edit/:id" element={<EditSubmissionForm />} />
      </Routes>
    </Router>
  );
};

export default App;