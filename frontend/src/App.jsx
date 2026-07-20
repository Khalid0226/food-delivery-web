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
        <Route path="/delivery/dashboard" element={
          <DeliveryLayout>
            <DeliveryDashboard />
          </DeliveryLayout>
        } />

        {/* 3. Customer & Admin Routes (Yeh sab apne global Layout ke andar rahenge) */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              {/* Customer Routes */}
              <Route path="/customer/dashboard" element={<CustomerDashboard />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path="/customer/orders" element={<TrackOrders />} />
              <Route path='/customer/account' element={<Account />} />
              <Route path='/order/:orderId' element={<OrderDetails />} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path='/admin/orders' element={<Orders />} />
              <Route path='/admin/customers' element={<Customers />} />
              <Route path='/admin/customer-profile/:id' element={<CustomerProfile />} />
              <Route path='/admin/settings' element={<Settings />} />
              <Route path='/admin/add-item' element={<AddItem />} />
              <Route path='/admin/view-item' element={<ManageItems />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;