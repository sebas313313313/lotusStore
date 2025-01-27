import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        {/* Rutas de autenticación */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        {/* Rutas del dashboard */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          {/* Aquí irán más rutas del admin */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App
