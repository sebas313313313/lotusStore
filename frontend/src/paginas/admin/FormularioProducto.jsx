import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clientAxios from "../../config/clientAxios";
import useAuth from "../../hooks/useAuth";

const FormularioProducto = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");
  const [stock, setStock] = useState("");
  const [categorias, setCategorias] = useState([]);

  const navigate = useNavigate();
  const params = useParams();
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
        }

        const { data } = await clientAxios('/categories', config);
        setCategorias(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCategorias();
  }, []);

  useEffect(() => {
    if(params.id) {
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

          const { data } = await clientAxios(`/products/${params.id}`, config);
          setNombre(data.nombre);
          setDescripcion(data.descripcion);
          setPrecio(data.precio);
          setCategoria(data.categoria._id);
          setStock(data.stock);
          setImagen(data.imagen);
        } catch (error) {
          console.log(error);
        }
      };
      obtenerProducto();
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if(!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('descripcion', descripcion);
      formData.append('precio', precio);
      formData.append('categoria', categoria);
      formData.append('stock', stock);
      if(imagen instanceof File) {
        formData.append('imagen', imagen);
      }

      if(params.id) {
        await clientAxios.put(`/products/${params.id}`, formData, {
          ...config,
          headers: {
            ...config.headers,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await clientAxios.post('/products', formData, {
          ...config,
          headers: {
            ...config.headers,
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      navigate('/dashboard/productos');
    } catch (error) {
      console.log(error);
    }
  };

  const handleImagenChange = (e) => {
    setImagen(e.target.files[0]);
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
          className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-white/10 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all min-h-[100px]"
          placeholder="Describe las características del producto..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            className="block text-white text-sm font-medium mb-2"
            htmlFor="precio"
          >
            Precio del Producto
          </label>
          <input
            id="precio"
            type="number"
            className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-white/10 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all"
            placeholder="Ej: 29.99"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>

        <div>
          <label
            className="block text-white text-sm font-medium mb-2"
            htmlFor="stock"
          >
            Stock Disponible
          </label>
          <input
            id="stock"
            type="number"
            className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-white/10 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all"
            placeholder="Ej: 100"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
      </div>

      <div className="my-6">
        <label
          className="block text-white text-sm font-medium mb-2"
          htmlFor="categoria"
        >
          Categoría
        </label>
        <select
          id="categoria"
          className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-white/10 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map(categoria => (
            <option key={categoria._id} value={categoria._id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label
          className="block text-white text-sm font-medium mb-2"
          htmlFor="imagen"
        >
          Imagen del Producto
        </label>
        <div className="relative">
          <input
            id="imagen"
            type="file"
            className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-white/10 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-white/10 file:text-white hover:file:bg-white/20"
            onChange={handleImagenChange}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {params.id ? "Actualizar Producto" : "Crear Producto"}
          </span>
        </button>
      </div>
    </form>
  );
};

export default FormularioProducto;
