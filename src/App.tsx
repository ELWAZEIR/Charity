import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Beneficiaries from './pages/Beneficiaries';
import BeneficiaryDetails from './pages/BeneficiaryDetails';
import AddBeneficiary from './pages/AddBeneficiary';
import Inventory from './pages/Inventory';
import Distribution from './pages/Distribution';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="beneficiaries" element={<Beneficiaries />} />
        <Route path="beneficiaries/:id" element={<BeneficiaryDetails />} />
        <Route path="beneficiaries/add" element={<AddBeneficiary />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="distribution" element={<Distribution />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;