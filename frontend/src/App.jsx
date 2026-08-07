import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import Register from './auth/Register';
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import CustomerDashboard from './modules/customer/pages/CustomerDashboard';
import ProductDetails from './modules/customer/pages/ProductDetails/ProductDetails';
import Cart from './modules/customer/pages/Cart';
import Checkout from './modules/customer/pages/Checkout';
import TrackOrders from './modules/customer/pages/TrackOrders';
import Layout from './components/layout/Layout';
import Account from './modules/customer/pages/Account';

import OrderDetails from './modules/customer/pages/OrderDetails';

import AdminDashboard from './modules/admin/AdminDashboard';
import Orders from './modules/admin/Orders';
import Customers from './modules/admin/Customers';
import CustomerProfile from './modules/admin/CustomerProfile';
import Settings from './modules/admin/Settings';
import AddItem from './modules/admin/AddItem';
import ManageItems from './modules/admin/ManageItems';

import DeliveryLayout from './components/delivery_layout/DeliveryLayout';
import DeliveryDashboard from './modules/delivery/DeliveryDashboard';
import DeliveryOrders from './modules/delivery/DeliveryOrders';
import DeliveryHistory from './modules/delivery/DeliveryHistory'
import DeliveryEarnings from './modules/delivery/DeliveryEarnings'
import DeliverySettings from './modules/delivery/DeliverySettings';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* 2. Delivery Boy Routes (Isme Customer Layout bilkul nahi aayega) */}
        {/* Delivery Boy Routes (Nested Routes) */}
        <Route path="/delivery/*" element={
          <DeliveryLayout>
            <Routes>
              <Route path="dashboard" element={<ProtectedRoute allowedRoles={['delivery']}><DeliveryDashboard /></ProtectedRoute>} />
              <Route path="orders" element={<ProtectedRoute allowedRoles={['delivery']}><DeliveryOrders /></ProtectedRoute>} />
              <Route path='history' element={<ProtectedRoute allowedRoles={['delivery']}><DeliveryHistory /></ProtectedRoute>} />
              <Route path='earnings' element={<ProtectedRoute allowedRoles={['delivery']}><DeliveryEarnings /></ProtectedRoute>} />
              <Route path='settings' element={<ProtectedRoute allowedRoles={['delivery']}><DeliverySettings /></ProtectedRoute>} />
            </Routes>
          </DeliveryLayout>
        } />

        {/* 3. Customer & Admin Routes (Yeh sab apne global Layout ke andar rahenge) */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              {/* Customer Routes */}
              <Route path="/customer/dashboard" element={<ProtectedRoute allowedRoles={['customer']}><CustomerDashboard /></ProtectedRoute>} />
              <Route path="/product/:id" element={<ProtectedRoute allowedRoles={['customer']}><ProductDetails /></ProtectedRoute>} />
              <Route path='/cart' element={<ProtectedRoute allowedRoles={['customer']}><Cart /></ProtectedRoute>} />
              <Route path='/checkout' element={<ProtectedRoute allowedRoles={['customer']}><Checkout /></ProtectedRoute>} />
              <Route path="/customer/orders" element={<ProtectedRoute allowedRoles={['customer']}><TrackOrders /></ProtectedRoute>} />
              <Route path='/customer/account' element={<ProtectedRoute allowedRoles={['customer']}><Account /></ProtectedRoute>} />
              <Route path='/order/:orderId' element={<ProtectedRoute allowedRoles={['customer']}><OrderDetails /></ProtectedRoute>} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
              <Route path='/admin/orders' element={<ProtectedRoute allowedRoles={['admin']}><Orders /></ProtectedRoute>} />
              <Route path='/admin/customers' element={<ProtectedRoute allowedRoles={['admin']}><Customers /></ProtectedRoute>} />
              <Route path='/admin/customer-profile/:id' element={<ProtectedRoute allowedRoles={['admin']}><CustomerProfile /></ProtectedRoute>} />
              <Route path='/admin/settings' element={<ProtectedRoute allowedRoles={['admin']}><Settings /></ProtectedRoute>} />
              <Route path='/admin/add-item' element={<ProtectedRoute allowedRoles={['admin']}><AddItem /></ProtectedRoute>} />
              <Route path='/admin/view-item' element={<ProtectedRoute allowedRoles={['admin']}><ManageItems /></ProtectedRoute>} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;