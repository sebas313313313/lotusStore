import { Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'

import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import NuevoPassword from './paginas/NuevoPassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import Dashboard from './paginas/admin/Dashboard'
import Productos from './paginas/admin/Productos'
import FormularioProducto from './paginas/admin/FormularioProducto'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="registrar" element={<Registrar />} />
        <Route path="olvide-password" element={<OlvidePassword />} />
        <Route path="olvide-password/:token" element={<NuevoPassword />} />
        <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
      </Route>

      <Route path="/dashboard" element={<RutaProtegida />}>
        <Route index element={<Dashboard />} />
        <Route path="productos" element={<Productos />} />
        <Route path="productos/nuevo" element={<FormularioProducto />} />
        <Route path="productos/editar/:id" element={<FormularioProducto />} />
      </Route>
    </Routes>
  )
}

export default App
