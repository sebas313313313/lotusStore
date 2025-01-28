import { useState, useEffect } from 'react'
import clientAxios from '../../config/clientAxios'

const Clientes = () => {
  const [clientes, setClientes] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }

        const { data } = await clientAxios('/clientes', config)
        setClientes(data)
      } catch (error) {
        console.log(error)
      }
      setCargando(false)
    }
    obtenerClientes()
  }, [])

  if(cargando) return 'Cargando...'

  return (
    <>
      <h1 className="text-4xl font-black">Clientes</h1>

      <div className="bg-black shadow mt-10 rounded-lg">
        {clientes.length ? (
          clientes.map(cliente => (
            <div
              key={cliente._id}
              className="border-b border-white/10 p-5 flex justify-between items-center"
            >
              <div>
                <p className="text-xl text-white">
                  {cliente.nombre}
                </p>
                <p className="text-sm text-white/60">
                  {cliente.email}
                </p>
                <p className="text-sm text-white/60">
                  Teléfono: {cliente.telefono}
                </p>
              </div>

              <div className="flex gap-2">
                <button
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
          <p className="text-center text-white my-5">No hay clientes registrados</p>
        )}
      </div>
    </>
  )
}

export default Clientes
