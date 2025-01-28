import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clientAxios from '../../config/clientAxios';
import useAuth from '../../hooks/useAuth';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { auth } = useAuth();

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clientAxios('/products', config);
                setProductos(data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        obtenerProductos();
    }, [auth]);

    const handleEliminar = async id => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            await clientAxios.delete(`/products/${id}`, config);
            
            const productosActualizados = productos.filter(producto => producto._id !== id)
            setProductos(productosActualizados);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Productos</h1>
                <Link 
                    to="/dashboard/productos/nuevo"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Nuevo Producto
                </Link>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Cargando...</p>
            ) : productos.length ? (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Imagen
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Categoría
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Precio
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stock
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {productos.map(producto => (
                                <tr key={producto._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img 
                                            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${producto.imagen}`}
                                            alt={producto.nombre}
                                            className="h-16 w-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {producto.nombre}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {producto.descripcion.substring(0, 50)}...
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {producto.categoria.nombre}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${producto.precio}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {producto.stock}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link 
                                            to={`/dashboard/productos/editar/${producto._id}`}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            className="text-red-600 hover:text-red-900"
                                            onClick={() => handleEliminar(producto._id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-600">No hay productos aún</p>
            )}
        </div>
    );
};

export default Productos;
