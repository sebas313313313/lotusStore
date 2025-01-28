import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth._id) {
            navigate('/');
        }
    }, [auth, navigate]);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card - Total Productos */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Total Productos</h2>
                    <p className="text-3xl font-bold text-blue-600">0</p>
                </div>

                {/* Card - Total Categorías */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Total Categorías</h2>
                    <p className="text-3xl font-bold text-green-600">5</p>
                </div>

                {/* Card - Total Pedidos */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Total Pedidos</h2>
                    <p className="text-3xl font-bold text-purple-600">0</p>
                </div>

                {/* Card - Total Ventas */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Total Ventas</h2>
                    <p className="text-3xl font-bold text-yellow-600">$0.00</p>
                </div>
            </div>

            {/* Acciones Rápidas */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Acciones Rápidas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button 
                        onClick={() => navigate('/dashboard/productos/nuevo')}
                        className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Crear Nuevo Producto
                    </button>
                    <button 
                        onClick={() => navigate('/dashboard/productos')}
                        className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Ver Productos
                    </button>
                    <button 
                        onClick={() => navigate('/dashboard/pedidos')}
                        className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Ver Pedidos
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
