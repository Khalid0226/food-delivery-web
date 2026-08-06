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
              <Route path="dashboard" element={<ProtectedRoute><DeliveryDashboard /></ProtectedRoute>} />
              <Route path="orders" element={<ProtectedRoute><DeliveryOrders /></ProtectedRoute>} />
              <Route path='history' element={<ProtectedRoute><DeliveryHistory /></ProtectedRoute>} />
              <Route path='earnings' element={<ProtectedRoute><DeliveryEarnings /></ProtectedRoute>} />
              <Route path='settings' element={<ProtectedRoute><DeliverySettings /></ProtectedRoute>} />
            </Routes>
          </DeliveryLayout>
        } />

        {/* 3. Customer & Admin Routes (Yeh sab apne global Layout ke andar rahenge) */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              {/* Customer Routes */}
              <Route path="/customer/dashboard" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />
              <Route path="/product/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
              <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/customer/orders" element={<ProtectedRoute><TrackOrders /></ProtectedRoute>} />
              <Route path='/customer/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
              <Route path='/order/:orderId' element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path='/admin/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path='/admin/customers' element={<ProtectedRoute><Customers /></ProtectedRoute>} />
              <Route path='/admin/customer-profile/:id' element={<ProtectedRoute><CustomerProfile /></ProtectedRoute>} />
              <Route path='/admin/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path='/admin/add-item' element={<ProtectedRoute><AddItem /></ProtectedRoute>} />
              <Route path='/admin/view-item' element={<ProtectedRoute><ManageItems /></ProtectedRoute>} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;