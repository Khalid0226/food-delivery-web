import React from 'react'
import Landing from './Landing'
import Register from './auth/Register'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './auth/Login'
import ForgotPassword from './auth/ForgotPassword'

function App() {
  return (
    <div>
      
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/Register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
