import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider } from './context/AuthProvider';
import AuthLayout from './layouts/AuthLayout';
import RutaProtegida from './layouts/RutaProtegida';
import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';
import NuevoPassword from './paginas/NuevoPassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import Productos from './paginas/admin/Productos';
import Dashboard from './paginas/admin/Dashboard';
import Pedidos from './paginas/admin/Pedidos';
import Clientes from './paginas/admin/Clientes';
import CategoriasAdmin from './paginas/admin/Categorias';
import Ventas from './paginas/admin/Ventas';
import Configuracion from './paginas/admin/Configuracion';
import HeaderLayout from './components/layout/HeaderLayout';
import Categorias from './paginas/visitante/Categorias';
import ProductosCategoria from './paginas/visitante/ProductosCategoria';
import CarritoSlide from './components/carrito/CarritoSlide';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      const productoExistente = prevCarrito.find(item => item._id === producto._id);
      if (productoExistente) {
        return prevCarrito.map(item =>
          item._id === producto._id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
    // Abrir el carrito cuando se agrega un producto
    setCarritoAbierto(true);
  };

  return (
    <BrowserRouter future={{ 
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <AuthProvider>
        <div className="min-h-screen bg-zinc-950">
          <HeaderLayout 
            carrito={carrito} 
            onCarritoClick={() => setCarritoAbierto(true)}
          />
          <CarritoSlide
            open={carritoAbierto}
            setOpen={setCarritoAbierto}
            carrito={carrito}
            setCarrito={setCarrito}
          />
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Categorias />} />
            <Route 
              path="/categoria/:id" 
              element={
                <ProductosCategoria 
                  carrito={carrito}
                  agregarAlCarrito={agregarAlCarrito}
                />
              } 
            />

            {/* Rutas de autenticación */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NuevoPassword />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            {/* Rutas protegidas de administración */}
            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<Dashboard />} />
              <Route path="productos" element={<Productos />} />
              <Route path="pedidos" element={<Pedidos />} />
              <Route path="clientes" element={<Clientes />} />
              <Route path="categorias" element={<CategoriasAdmin />} />
              <Route path="ventas" element={<Ventas />} />
              <Route path="configuracion" element={<Configuracion />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
