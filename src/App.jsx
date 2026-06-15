import React from 'react'
import Landing from './Landing'
import Register from './auth/Register'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './auth/Login'

function App() {
  return (
    <div>
      
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/Register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
