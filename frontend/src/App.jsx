import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
// import Dashboard from './pages/Dashboard'; // пример защищённого

export default function App() {
  return (
    <Routes>
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/*<Route*/}
      {/*  path="/dashboard"*/}
      {/*  element={*/}
      {/*    // здесь надо проверять, есть ли кука с JWT, или сделать context*/}
      {/*    <Dashboard />*/}
      {/*  }*/}
      {/*/>*/}
      {/* все прочие — на логин */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
