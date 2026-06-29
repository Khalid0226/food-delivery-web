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

function App() {
  return (
    <BrowserRouter>
      {/* Layout ko BrowserRouter ke andar rakha gaya hai taaki useLocation hook kaam kare */}
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Customer Routes */}
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path="/customer/orders" element={<TrackOrders />} />
          <Route path='/customer/account' element={<Account />}></Route>

          <Route path='/order/:orderId' element={<OrderDetails />}></Route>


          {/* admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path='/admin/orders' element={<Orders />}></Route>
          <Route path='/admin/customers' element={<Customers />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;