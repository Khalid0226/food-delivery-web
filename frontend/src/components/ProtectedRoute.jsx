import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {

    const token = localStorage.getItem('token')

    const storedUser = JSON.parse(localStorage.getItem('user'))

    if(!token || !storedUser){
        return <Navigate to='/login'/>
    }
  return children
}

export default ProtectedRoute
