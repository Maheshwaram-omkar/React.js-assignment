import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Otp from './pages/Otp'
import RestaurantList from './pages/RestaurantList'
import RestaurantDetail from './pages/RestaurantDetail'

const PrivateRoute = ({ children }) => {
  const auth = localStorage.getItem('isAuthenticated') === 'true'
  return auth ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/list" element={<PrivateRoute><RestaurantList /></PrivateRoute>} />
      <Route path="/detail/:id" element={<PrivateRoute><RestaurantDetail /></PrivateRoute>} />
      <Route path="*" element={<div className="p-6">Not Found</div>} />
    </Routes>
  )
}
