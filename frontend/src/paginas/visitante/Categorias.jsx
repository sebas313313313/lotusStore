import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clientAxios from '../../config/clientAxios';
import { HoverEffect } from '../../components/ui/HoverEffect';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const { data } = await clientAxios('/categorias');
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      } finally {
        setCargando(false);
      }
    };
    obtenerCategorias();
  }, []);

  const handleCategoriaClick = (categoria) => {
    navigate(`/categoria/${categoria.id}`);
  };

  const categoriasItems = categorias.map(categoria => ({
    id: categoria._id,
    title: categoria.nombre,
    description: categoria.descripcion || 'Explora nuestra selección de productos en esta categoría',
    imagen: categoria.imagen
  }));

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
        <div className="bg-zinc-900/50 p-6 rounded-xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">
                Nuestras Categorías
              </h1>
              <p className="text-gray-400 text-sm">
                Explora nuestra variedad de productos por categoría
              </p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 p-6 rounded-xl">
          {categorias.length > 0 ? (
            <HoverEffect
              items={categoriasItems}
              onClick={handleCategoriaClick}
            />
          ) : (
            <div className="text-center py-10">
              <p className="text-white text-xl mb-2">No hay categorías disponibles</p>
              <p className="text-gray-400">Vuelve más tarde</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categorias;
