import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const HeaderLayout = ({ carrito = [], onCarritoClick }) => {
  const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <header className="bg-zinc-900/50 border-b border-zinc-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo y Nombre de la Tienda */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="Lotus Store" 
              className="h-10 w-10"
            />
            <span className="text-2xl font-black text-white">
              Lotus Store
            </span>
          </Link>

          {/* Iconos de Carrito y Admin */}
          <div className="flex items-center gap-6">
            {/* Carrito con contador */}
            <button 
              onClick={onCarritoClick}
              className="relative text-white hover:text-blue-500 transition-colors"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {totalProductos > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalProductos}
                </span>
              )}
            </button>

            {/* Icono de Admin */}
            <Link 
              to="/auth/login" 
              className="text-white hover:text-blue-500 transition-colors"
              title="Administración"
            >
              <UserCircleIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderLayout;
