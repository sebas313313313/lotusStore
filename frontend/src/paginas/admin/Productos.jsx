import { useState, useEffect } from 'react';
import clientAxios from '../../config/clientAxios';
import FormularioProducto from './FormularioProducto';
import { HoverEffect } from '../../components/ui/HoverEffect';
import useAuth from '../../hooks/useAuth';
import Modal from '../../components/Modal'; 

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
      <div className="flex flex-col gap-6">
        <div className="bg-zinc-900/50 p-6 rounded-xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">
                {categoriaSeleccionada ? `Productos - ${categoriaSeleccionada.nombre}` : 'Categorías'}
              </h1>
              {categoriaSeleccionada && (
                <p className="text-gray-400 text-sm">
                  {productos.length} producto(s) encontrado(s)
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {categoriaSeleccionada && (
                <>
                  <button
                    onClick={handleNuevoProducto}
                    className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                  >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                      Nuevo Producto
                    </span>
                  </button>
                  <button
                    onClick={() => setCategoriaSeleccionada(null)}
                    className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                  >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                      Volver a Categorías
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 p-6 rounded-xl">
          {!categoriaSeleccionada ? (
            categorias.length > 0 ? (
              <HoverEffect
                items={categoriasItems}
                onClick={handleCategoriaClick}
              />
            ) : (
              <div className="text-center py-10">
                <p className="text-white text-xl mb-2">No hay categorías registradas</p>
                <p className="text-gray-400">Primero debes crear algunas categorías</p>
              </div>
            )
          ) : (
            productos.length > 0 ? (
              <HoverEffect
                items={productosItems}
                onClick={(producto) => handleEditarProducto(productos.find(p => p._id === producto.id))}
              />
            ) : (
              <div className="text-center py-10">
                <p className="text-white text-xl mb-4">No hay productos en esta categoría</p>
                <button
                  onClick={handleNuevoProducto}
                  className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Agregar Primer Producto
                  </span>
                </button>
              </div>
            )
          )}
        </div>
      </div>

      <Modal 
        isOpen={modalAbierto} 
        onClose={() => {
          setModalAbierto(false)
          setProductoEditar(null)
        }}
        title={productoEditar ? 'Editar Producto' : 'Nuevo Producto'}
      >
        <FormularioProducto
          producto={productoEditar}
          categoriaInicial={categoriaSeleccionada}
          onSubmit={() => {
            setModalAbierto(false)
            setProductoEditar(null)
          }}
        />
      </Modal>
    </div>
  );
};

export default Productos;
