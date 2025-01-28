import { useState, useEffect } from 'react'
import clientAxios from '../../config/clientAxios'

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }

        const { data } = await clientAxios('/pedidos', config)
        setPedidos(data)
      } catch (error) {
        console.log(error)
      }
      setCargando(false)
    }
    obtenerPedidos()
  }, [])

  if(cargando) return 'Cargando...'

  return (
    <>
      <h1 className="text-4xl font-black">Pedidos</h1>

      <div className="bg-black shadow mt-10 rounded-lg">
        {pedidos.length ? (
          pedidos.map(pedido => (
            <div
              key={pedido._id}
              className="border-b border-white/10 p-5 flex justify-between items-center"
            >
              <div>
                <p className="text-xl text-white">
                  Cliente: {pedido.cliente}
                </p>
                <p className="text-sm text-white/60">
                  Fecha: {new Date(pedido.fecha).toLocaleDateString()}
                </p>
                <p className="text-2xl text-white font-black mt-2">
                  Total: ${pedido.total}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Completar
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white my-5">No hay pedidos aún</p>
        )}
      </div>
    </>
  )
}

export default Pedidos
