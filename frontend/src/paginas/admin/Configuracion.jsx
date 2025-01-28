import { useState, useEffect } from 'react'
import clientAxios from '../../config/clientAxios'

const Configuracion = () => {
  const [configuracion, setConfiguracion] = useState({
    nombreTienda: '',
    direccion: '',
    telefono: '',
    email: '',
    moneda: 'USD',
    impuestos: '0'
  })

  useEffect(() => {
    const obtenerConfiguracion = async () => {
      try {
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }

        const { data } = await clientAxios('/configuracion', config)
        setConfiguracion(data)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerConfiguracion()
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

      await clientAxios.put('/configuracion', configuracion, config)
      alert('Configuración guardada correctamente')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1 className="text-4xl font-black">Configuración</h1>

      <div className="mt-10 bg-black p-8 rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              className="block text-white text-sm font-bold mb-2"
              htmlFor="nombreTienda"
            >
              Nombre de la Tienda
            </label>
            <input
              type="text"
              id="nombreTienda"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-black text-white leading-tight focus:outline-none focus:shadow-outline border-white/10"
              placeholder="Nombre de tu tienda"
              value={configuracion.nombreTienda}
              onChange={e => setConfiguracion({
                ...configuracion,
                nombreTienda: e.target.value
              })}
            />
          </div>

          <div>
            <label 
              className="block text-white text-sm font-bold mb-2"
              htmlFor="direccion"
            >
              Dirección
            </label>
            <input
              type="text"
              id="direccion"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-black text-white leading-tight focus:outline-none focus:shadow-outline border-white/10"
              placeholder="Dirección de tu tienda"
              value={configuracion.direccion}
              onChange={e => setConfiguracion({
                ...configuracion,
                direccion: e.target.value
              })}
            />
          </div>

          <div>
            <label 
              className="block text-white text-sm font-bold mb-2"
              htmlFor="telefono"
            >
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-black text-white leading-tight focus:outline-none focus:shadow-outline border-white/10"
              placeholder="Teléfono de contacto"
              value={configuracion.telefono}
              onChange={e => setConfiguracion({
                ...configuracion,
                telefono: e.target.value
              })}
            />
          </div>

          <div>
            <label 
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-black text-white leading-tight focus:outline-none focus:shadow-outline border-white/10"
              placeholder="Email de contacto"
              value={configuracion.email}
              onChange={e => setConfiguracion({
                ...configuracion,
                email: e.target.value
              })}
            />
          </div>

          <div>
            <label 
              className="block text-white text-sm font-bold mb-2"
              htmlFor="moneda"
            >
              Moneda
            </label>
            <select
              id="moneda"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-black text-white leading-tight focus:outline-none focus:shadow-outline border-white/10"
              value={configuracion.moneda}
              onChange={e => setConfiguracion({
                ...configuracion,
                moneda: e.target.value
              })}
            >
              <option value="USD">USD - Dólar Estadounidense</option>
              <option value="EUR">EUR - Euro</option>
              <option value="COP">COP - Peso Colombiano</option>
            </select>
          </div>

          <div>
            <label 
              className="block text-white text-sm font-bold mb-2"
              htmlFor="impuestos"
            >
              Impuestos (%)
            </label>
            <input
              type="number"
              id="impuestos"
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-black text-white leading-tight focus:outline-none focus:shadow-outline border-white/10"
              placeholder="Porcentaje de impuestos"
              value={configuracion.impuestos}
              onChange={e => setConfiguracion({
                ...configuracion,
                impuestos: e.target.value
              })}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Configuracion
