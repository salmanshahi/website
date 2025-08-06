import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import POS from './pages/POS/POS';
import ProductList from './pages/Products/ProductList';
import CreateProduct from './pages/Products/CreateProduct';
import BrandList from './pages/Products/BrandList';
import CategoryList from './pages/Products/CategoryList';
import UnitList from './pages/Products/UnitList';
import ImportProduct from './pages/Products/ImportProduct';
import CustomerList from './pages/People/CustomerList';
import SupplierList from './pages/People/SupplierList';
import SalesList from './pages/Sales/SalesList';
import PurchaseList from './pages/Purchase/PurchaseList';
import CreatePurchase from './pages/Purchase/CreatePurchase';
import SalesReport from './pages/Reports/SalesReport';
import Inventory from './pages/Reports/Inventory';
import Profile from './pages/Profile/Profile';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <Layout>{children}</Layout> : <Navigate to="/login" />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return !user ? <>{children}</> : <Navigate to="/dashboard" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />
          <Route path="/forgot-password" element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          } />

          {/* Private Routes */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/pos" element={
            <PrivateRoute>
              <POS />
            </PrivateRoute>
          } />
          <Route path="/products" element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          } />
          <Route path="/products/create" element={
            <PrivateRoute>
              <CreateProduct />
            </PrivateRoute>
          } />
          <Route path="/products/brands" element={
            <PrivateRoute>
              <BrandList />
            </PrivateRoute>
          } />
          <Route path="/products/categories" element={
            <PrivateRoute>
              <CategoryList />
            </PrivateRoute>
          } />
          <Route path="/products/units" element={
            <PrivateRoute>
              <UnitList />
            </PrivateRoute>
          } />
          <Route path="/products/import" element={
            <PrivateRoute>
              <ImportProduct />
            </PrivateRoute>
          } />
          <Route path="/customers" element={
            <PrivateRoute>
              <CustomerList />
            </PrivateRoute>
          } />
          <Route path="/suppliers" element={
            <PrivateRoute>
              <SupplierList />
            </PrivateRoute>
          } />
          <Route path="/sales" element={
            <PrivateRoute>
              <SalesList />
            </PrivateRoute>
          } />
          <Route path="/purchases" element={
            <PrivateRoute>
              <PurchaseList />
            </PrivateRoute>
          } />
          <Route path="/purchases/create" element={
            <PrivateRoute>
              <CreatePurchase />
            </PrivateRoute>
          } />
          <Route path="/reports/sales" element={
            <PrivateRoute>
              <SalesReport />
            </PrivateRoute>
          } />
          <Route path="/reports/inventory" element={
            <PrivateRoute>
              <Inventory />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
