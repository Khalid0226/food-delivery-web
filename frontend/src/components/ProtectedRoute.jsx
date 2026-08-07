import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children,allowedRoles}) {

    const token = localStorage.getItem('token')

    const storedUser = JSON.parse(localStorage.getItem('user'))

    if(!token || !storedUser){
        return <Navigate to='/login' replace/>
    }

    if (allowedRoles && !allowedRoles.includes(storedUser.role)) {
        return <Navigate to="/login" replace />; // Ya apne hisab se koi unauthorized page
    }

  return children
}

export default ProtectedRoute
