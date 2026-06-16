import React from 'react'
import Landing from './Landing'
import Register from './auth/Register'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './auth/Login'
import ForgotPassword from './auth/ForgotPassword'


import CustomerDashboard from './modules/customer/pages/CustomerDashboard';


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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
