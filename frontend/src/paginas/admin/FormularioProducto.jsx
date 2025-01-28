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
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="nombre"
        >
          Nombre Producto
        </label>
        <input
          id="nombre"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del Producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="descripcion"
        >
          Descripción Producto
        </label>
        <textarea
          id="descripcion"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripción del Producto"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="precio"
        >
          Precio Producto
        </label>
        <input
          id="precio"
          type="number"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Precio del Producto"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="categoria"
        >
          Categoría Producto
        </label>
        <select
          id="categoria"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">-- Seleccionar --</option>
          {categorias.map(categoria => (
            <option key={categoria._id} value={categoria._id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="stock"
        >
          Stock Producto
        </label>
        <input
          id="stock"
          type="number"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Stock del Producto"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="imagen"
        >
          Imagen Producto
        </label>
        <input
          id="imagen"
          type="file"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          onChange={handleImagenChange}
        />
      </div>

      <input
        type="submit"
        value={params.id ? "Actualizar Producto" : "Crear Producto"}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormularioProducto;
