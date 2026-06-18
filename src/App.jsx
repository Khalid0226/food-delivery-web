import React from 'react'
import Landing from './Landing'
import Register from './auth/Register'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './auth/Login'
import ForgotPassword from './auth/ForgotPassword'


import CustomerDashboard from './modules/customer/pages/CustomerDashboard';

import ProductDetails from './modules/customer/pages/ProductDetails/ProductDetails'
import Cart from './modules/customer/pages/Cart'


function App() {
  return (
    <div>
      
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/Register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
