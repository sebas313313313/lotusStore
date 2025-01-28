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
      <div className="flex flex-col gap-6">
        <div className="bg-zinc-900/50 p-6 rounded-xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-4xl font-black text-white">Categorías</h1>
            <button
              onClick={() => setModalAbierto(true)}
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Nueva Categoría
              </span>
            </button>
          </div>
        </div>

        <div className="bg-zinc-900/50 rounded-xl overflow-hidden">
          {categorias.length ? (
            <div className="divide-y divide-white/10">
              {categorias.map(categoria => (
                <div
                  key={categoria._id}
                  className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4 hover:bg-white/5 transition-colors"
                >
                  <p className="text-xl text-white font-medium">
                    {categoria.nombre}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setCategoriaEditar(categoria)
                        setNombre(categoria.nombre)
                        setModalAbierto(true)
                      }}
                      className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                    >
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        Editar
                      </span>
                    </button>
                    <button
                      className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                    >
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FF9E9E_0%,#B23939_50%,#FF9E9E_100%)]" />
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        Eliminar
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-white text-xl mb-2">No hay categorías registradas</p>
              <p className="text-gray-400">Crea tu primera categoría para comenzar</p>
            </div>
          )}
        </div>
      </div>

      {modalAbierto && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900/90 p-8 rounded-2xl w-full max-w-md border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">
              {categoriaEditar ? 'Editar Categoría' : 'Nueva Categoría'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  className="block text-white text-sm font-medium mb-2"
                  htmlFor="nombre"
                >
                  Nombre de la Categoría
                </label>
                <input
                  type="text"
                  id="nombre"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-white/10 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all"
                  placeholder="Ej: Ropa, Accesorios, etc."
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setModalAbierto(false)
                    setNombre('')
                    setCategoriaEditar(null)
                  }}
                  className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Cancelar
                  </span>
                </button>
                <button
                  type="submit"
                  className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    {categoriaEditar ? 'Guardar Cambios' : 'Crear Categoría'}
                  </span>
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
