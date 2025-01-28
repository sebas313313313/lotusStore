import { useState, useEffect } from "react";
import clientAxios from "../../config/clientAxios";
import useAuth from "../../hooks/useAuth";
import AlertModal from "../../components/AlertModal";

const FormularioProducto = ({ producto, categoriaInicial, onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState("");
  const [stock, setStock] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    if(producto) {
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
      setPrecio(producto.precio);
      setStock(producto.stock);
      setImagenPreview(producto.imagen);
    }
  }, [producto]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if(!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('descripcion', descripcion);
      formData.append('precio', precio);
      formData.append('categoria', categoriaInicial._id);
      formData.append('stock', stock);
      if(imagen) {
        formData.append('imagen', imagen);
      }

      if(producto) {
        await clientAxios.put(`/productos/${producto._id}`, formData, config);
      } else {
        await clientAxios.post('/productos', formData, config);
      }

      onSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEliminar = async () => {
    try {
      const token = localStorage.getItem('token');
      if(!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      await clientAxios.delete(`/productos/${producto._id}`, config);
      onSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    if(file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagenPreview(reader.result);
      }
      reader.readAsDataURL(file);
    }
  };

  return (
    <form 
      className="w-full"
      onSubmit={handleSubmit}
    >
      <div className="mb-6">
        <label
          className="block text-white text-sm font-medium mb-2"
          htmlFor="nombre"
        >
          Nombre del Producto
        </label>
        <input
          id="nombre"
          type="text"
          className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-white/10 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all"
          placeholder="Ej: Camiseta de Algodón"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label
          className="block text-white text-sm font-medium mb-2"
          htmlFor="descripcion"
        >
          Descripción del Producto
        </label>
        <textarea
          id="descripcion"
          className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-white/10 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all"
          placeholder="Describe el producto..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            className="block text-white text-sm font-medium mb-2"
            htmlFor="precio"
          >
            Precio
          </label>
          <input
            id="precio"
            type="number"
            className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-white/10 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all"
            placeholder="0.00"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>

        <div>
          <label
            className="block text-white text-sm font-medium mb-2"
            htmlFor="stock"
          >
            Stock
          </label>
          <input
            id="stock"
            type="number"
            className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-white/10 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all"
            placeholder="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <label
          className="block text-white text-sm font-medium mb-2"
          htmlFor="imagen"
        >
          Imagen del Producto
        </label>
        <div className="flex flex-col items-center gap-4">
          {imagenPreview && (
            <img 
              src={imagenPreview} 
              alt="Vista previa" 
              className="w-40 h-40 object-cover rounded-lg"
            />
          )}
          <input
            id="imagen"
            type="file"
            accept="image/*"
            onChange={handleImagenChange}
            className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-white/10 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="flex-1 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {producto ? 'Guardar Cambios' : 'Crear Producto'}
          </span>
        </button>

        {producto && (
          <button
            type="button"
            onClick={() => setShowDeleteAlert(true)}
            className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FF9E9E_0%,#B23939_50%,#FF9E9E_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Eliminar
            </span>
          </button>
        )}
      </div>

      <AlertModal
        isOpen={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        onConfirm={handleEliminar}
        title="¿Eliminar Producto?"
        message={`¿Estás seguro de que deseas eliminar el producto "${nombre}"? Esta acción no se puede deshacer.`}
      />
    </form>
  );
};

export default FormularioProducto;
