import { useState, useEffect } from 'react';
import clientAxios from '../../config/clientAxios';
import FormularioProducto from '../../components/FormularioProducto';
import { HoverEffect } from '../../components/ui/HoverEffect';
import useAuth from '../../hooks/useAuth';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const token = localStorage.getItem('token');
        if(!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        };

        const { data } = await clientAxios('/categorias', config);
        setCategorias(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCategorias();
  }, []);

  useEffect(() => {
    const obtenerProductos = async () => {
      if (!categoriaSeleccionada) return;
      
      try {
        const token = localStorage.getItem('token');
        if(!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        };

        const { data } = await clientAxios(`/productos?categoria=${categoriaSeleccionada._id}`, config);
        setProductos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProductos();
  }, [categoriaSeleccionada, modalAbierto]);

  const handleNuevoProducto = () => {
    setProductoEditar(null);
    setModalAbierto(true);
  };

  const handleEditarProducto = (producto) => {
    setProductoEditar(producto);
    setModalAbierto(true);
  };

  const handleEliminarProducto = async (id) => {
    if(!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      const token = localStorage.getItem('token');
      if(!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };

      await clientAxios.delete(`/productos/${id}`, config);
      setProductos(productos.filter(p => p._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoriaClick = (categoria) => {
    const categoriaCompleta = categorias.find(cat => cat._id === categoria.id);
    setCategoriaSeleccionada(categoriaCompleta);
  };

  const categoriasItems = categorias.map(categoria => ({
    id: categoria._id,
    title: categoria.nombre,
    description: categoria.descripcion || 'Sin descripción',
  }));

  const productosItems = productos.map(producto => ({
    id: producto._id,
    title: producto.nombre,
    description: `Precio: $${producto.precio} - Stock: ${producto.stock}`,
  }));

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black">
          {categoriaSeleccionada ? `Productos - ${categoriaSeleccionada.nombre}` : 'Categorías'}
        </h1>
        {categoriaSeleccionada && (
          <>
            <button
              onClick={() => setCategoriaSeleccionada(null)}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Volver a Categorías
            </button>
            <button
              onClick={handleNuevoProducto}
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            >
              Nuevo Producto
            </button>
          </>
        )}
      </div>

      {!categoriaSeleccionada ? (
        categorias.length > 0 ? (
          <HoverEffect
            items={categoriasItems}
            onClick={handleCategoriaClick}
          />
        ) : (
          <p className="text-center text-white my-5">No hay categorías registradas</p>
        )
      ) : (
        productos.length > 0 ? (
          <HoverEffect
            items={productosItems}
            onClick={(producto) => handleEditarProducto(productos.find(p => p._id === producto.id))}
          />
        ) : (
          <div className="text-center">
            <p className="text-white my-5">No hay productos en esta categoría</p>
            <button
              onClick={handleNuevoProducto}
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            >
              Agregar Producto
            </button>
          </div>
        )
      )}

      <FormularioProducto
        isOpen={modalAbierto}
        onClose={() => {
          setModalAbierto(false);
          setProductoEditar(null);
        }}
        producto={productoEditar}
        categoriaInicial={categoriaSeleccionada}
      />
    </div>
  );
};

export default Productos;
