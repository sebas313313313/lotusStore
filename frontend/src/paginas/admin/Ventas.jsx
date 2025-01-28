import { useState, useEffect } from 'react'
import clientAxios from '../../config/clientAxios'

const Ventas = () => {
  const [ventas, setVentas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [totalVentas, setTotalVentas] = useState(0)

  useEffect(() => {
    const obtenerVentas = async () => {
      try {
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }

        const { data } = await clientAxios('/ventas', config)
        setVentas(data)
        
        // Calcular total de ventas
        const total = data.reduce((acc, venta) => acc + venta.total, 0)
        setTotalVentas(total)
      } catch (error) {
        console.log(error)
      }
      setCargando(false)
    }
    obtenerVentas()
  }, [])

  if(cargando) return 'Cargando...'

  return (
    <>
      <h1 className="text-4xl font-black">Ventas</h1>

      <div className="mt-10 bg-black p-5 rounded-lg shadow">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white">Resumen</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-black p-4 rounded-lg border border-white/10">
              <p className="text-white/60">Total Ventas</p>
              <p className="text-2xl font-bold text-white">${totalVentas}</p>
            </div>
            <div className="bg-black p-4 rounded-lg border border-white/10">
              <p className="text-white/60">Ventas del Mes</p>
              <p className="text-2xl font-bold text-white">{ventas.length}</p>
            </div>
            <div className="bg-black p-4 rounded-lg border border-white/10">
              <p className="text-white/60">Promedio por Venta</p>
              <p className="text-2xl font-bold text-white">
                ${ventas.length > 0 ? (totalVentas / ventas.length).toFixed(2) : 0}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-5">Historial de Ventas</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Productos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {ventas.map(venta => (
                  <tr key={venta._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {new Date(venta.fecha).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {venta.cliente}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {venta.productos.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      ${venta.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        venta.estado === 'completado' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {venta.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Ventas
