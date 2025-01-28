import { useState, useEffect } from 'react'
import clientAxios from '../../config/clientAxios'

const Categorias = () => {
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [categoriaEditar, setCategoriaEditar] = useState(null)
  const [nombre, setNombre] = useState('')

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }

        const { data } = await clientAxios('/categorias', config)
        setCategorias(data)
      } catch (error) {
        console.log(error)
      }
      setCargando(false)
    }
    obtenerCategorias()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      if(categoriaEditar) {
        const { data } = await clientAxios.put(`/categorias/${categoriaEditar._id}`, { nombre }, config)
        setCategorias(categorias.map(categoria => 
          categoria._id === data._id ? data : categoria
        ))
      } else {
        const { data } = await clientAxios.post('/categorias', { nombre }, config)
        setCategorias([...categorias, data])
      }

      setModalAbierto(false)
      setNombre('')
      setCategoriaEditar(null)
    } catch (error) {
      console.log(error)
    }
  }

  if(cargando) return 'Cargando...'

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black">Categorías</h1>
        <button
          onClick={() => setModalAbierto(true)}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
        >
          Nueva Categoría
        </button>
      </div>

      <div className="bg-black shadow mt-10 rounded-lg">
        {categorias.length ? (
          categorias.map(categoria => (
            <div
              key={categoria._id}
              className="border-b border-white/10 p-5 flex justify-between items-center"
            >
              <p className="text-xl text-white">
                {categoria.nombre}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCategoriaEditar(categoria)
                    setNombre(categoria.nombre)
                    setModalAbierto(true)
                  }}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white my-5">No hay categorías registradas</p>
        )}
      </div>

      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-black p-8 rounded-lg w-96 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              {categoriaEditar ? 'Editar Categoría' : 'Nueva Categoría'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="nombre"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-black text-white leading-tight focus:outline-none focus:shadow-outline border-white/10"
                  placeholder="Nombre de la categoría"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalAbierto(false)
                    setNombre('')
                    setCategoriaEditar(null)
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
                >
                  {categoriaEditar ? 'Guardar Cambios' : 'Crear Categoría'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Categorias
