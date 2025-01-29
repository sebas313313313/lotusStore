import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import useAuth from '../../hooks/useAuth';

const FormularioProducto = () => {
    const [categorias, setCategorias] = useState([]);
    const [producto, setProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: '',
        stock: ''
    });
    const [imagen, setImagen] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();
    const { auth } = useAuth();

    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const { data } = await clienteAxios('/categorias');
                setCategorias(data);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerCategorias();

        if(id) {
            const obtenerProducto = async () => {
                try {
                    const token = localStorage.getItem('token');
                    if(!token) return;

                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }

                    const { data } = await clienteAxios(`/productos/${id}`, config);
                    setProducto(data);
                } catch (error) {
                    console.log(error);
                }
            }
            obtenerProducto();
        }
    }, [id]);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const formData = new FormData();
            formData.append('nombre', producto.nombre);
            formData.append('descripcion', producto.descripcion);
            formData.append('precio', producto.precio);
            formData.append('categoria', producto.categoria);
            formData.append('stock', producto.stock);
            if(imagen) {
                formData.append('imagen', imagen);
            }

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            }

            if(id) {
                await clienteAxios.put(`/productos/${id}`, formData, config);
            } else {
                await clienteAxios.post('/productos', formData, config);
            }

            navigate('/admin/productos');
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">
                {id ? 'Editar Producto' : 'Nuevo Producto'}
            </h1>

            <form 
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto"
            >
                <div className="mb-4">
                    <label 
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="nombre"
                    >
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Nombre del Producto"
                        value={producto.nombre}
                        onChange={e => setProducto({...producto, nombre: e.target.value})}
                    />
                </div>

                <div className="mb-4">
                    <label 
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="descripcion"
                    >
                        Descripción
                    </label>
                    <textarea
                        id="descripcion"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Descripción del Producto"
                        rows="4"
                        value={producto.descripcion}
                        onChange={e => setProducto({...producto, descripcion: e.target.value})}
                    />
                </div>

                <div className="mb-4">
                    <label 
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="precio"
                    >
                        Precio
                    </label>
                    <input
                        type="number"
                        id="precio"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Precio del Producto"
                        value={producto.precio}
                        onChange={e => setProducto({...producto, precio: e.target.value})}
                    />
                </div>

                <div className="mb-4">
                    <label 
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="categoria"
                    >
                        Categoría
                    </label>
                    <select
                        id="categoria"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={producto.categoria}
                        onChange={e => setProducto({...producto, categoria: e.target.value})}
                    >
                        <option value="">-- Seleccionar --</option>
                        {categorias.map(categoria => (
                            <option 
                                key={categoria._id}
                                value={categoria._id}
                            >
                                {categoria.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label 
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="stock"
                    >
                        Stock
                    </label>
                    <input
                        type="number"
                        id="stock"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Stock del Producto"
                        value={producto.stock}
                        onChange={e => setProducto({...producto, stock: e.target.value})}
                    />
                </div>

                <div className="mb-4">
                    <label 
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="imagen"
                    >
                        Imagen
                    </label>
                    <input
                        type="file"
                        id="imagen"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={e => setImagen(e.target.files[0])}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors mr-2"
                        onClick={() => navigate('/admin/productos')}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : (id ? 'Guardar Cambios' : 'Crear Producto')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormularioProducto;
