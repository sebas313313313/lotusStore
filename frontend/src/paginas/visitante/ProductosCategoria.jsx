import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import clientAxios from '../../config/clientAxios';
import { BackgroundGradient } from '../../components/ui/background-gradient';

const ProductosCategoria = ({ carrito, agregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState(null);
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        // Primero obtenemos la categoría
        const categoriaRes = await clientAxios(`/categorias/${id}`);
        setCategoria(categoriaRes.data);

        // Luego obtenemos los productos de esa categoría
        const productosRes = await clientAxios(`/productos/categoria/${id}`);
        
        console.log('Categoría:', categoriaRes.data);
        console.log('Productos obtenidos:', productosRes.data);
        setProductos(productosRes.data || []);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setCargando(false);
      }
    };
    obtenerProductos();
  }, [id]);

  if (cargando) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Encabezado */}
        <div className="bg-zinc-900/50 p-6 rounded-xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">
                {categoria?.nombre}
              </h1>
              <p className="text-gray-400 text-sm">
                {categoria?.descripcion}
              </p>
            </div>
          </div>
        </div>

        {/* Lista de Productos */}
        <div className="bg-zinc-900/50 p-6 rounded-xl">
          {productos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productos.map(producto => (
                <div key={producto._id}>
                  <BackgroundGradient className="p-4 sm:p-8">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${producto.imagen}`}
                      alt={producto.nombre}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <h3 className="text-xl text-white mt-4 mb-2 font-bold">
                      {producto.nombre}
                    </h3>
                    <p className="text-sm text-neutral-400 mb-4">
                      {producto.descripcion}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="bg-zinc-800 rounded-full px-4 py-1 text-white text-sm">
                        ${producto.precio}
                      </span>
                      <button 
                        onClick={() => agregarAlCarrito(producto)}
                        className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 transition-colors text-sm"
                      >
                        Agregar al Carrito
                      </button>
                    </div>
                  </BackgroundGradient>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-white text-xl mb-2">No hay productos disponibles en esta categoría</p>
              <p className="text-gray-400">Vuelve más tarde</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductosCategoria;
