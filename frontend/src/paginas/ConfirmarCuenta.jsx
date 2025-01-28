import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import clientAxios from '../config/clientAxios'

const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState('')

    const params = useParams()
    const { id } = params

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const { data } = await clientAxios(`/users/confirmar/${id}`)
                setCuentaConfirmada(true)
                setAlerta(data.msg)
            } catch (error) {
                setAlerta(error.response?.data?.msg)
            }
            setCargando(false)
        }
        confirmarCuenta()
    }, [])

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">
                Confirma tu cuenta y comienza a crear tus {''}
                <span className="text-slate-700">productos</span>
            </h1>

            <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {!cargando && (
                    <div className={`${cuentaConfirmada ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'} px-4 py-3 rounded relative`} role="alert">
                        <span className="block sm:inline">{alerta}</span>
                    </div>
                )}

                {cuentaConfirmada && (
                    <Link
                        className='block text-center my-5 text-slate-500 uppercase text-sm'
                        to="/"
                    >Inicia Sesión</Link>
                )}
            </div>
        </>
    )
}

export default ConfirmarCuenta
