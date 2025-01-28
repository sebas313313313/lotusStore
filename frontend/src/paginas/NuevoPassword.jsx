import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import clientAxios from '../config/clientAxios'

const NuevoPassword = () => {
    const [password, setPassword] = useState('')
    const [tokenValido, setTokenValido] = useState(false)
    const [alerta, setAlerta] = useState('')
    const [passwordModificado, setPasswordModificado] = useState(false)

    const params = useParams()
    const { token } = params

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clientAxios(`/users/olvide-password/${token}`)
                setTokenValido(true)
            } catch (error) {
                setAlerta(error.response?.data?.msg)
            }
        }
        comprobarToken()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()

        if(password.length < 6) {
            setAlerta('El Password debe ser mínimo de 6 caracteres')
            return
        }

        try {
            const { data } = await clientAxios.post(`/users/olvide-password/${token}`, { password })
            setAlerta(data.msg)
            setPasswordModificado(true)
        } catch (error) {
            setAlerta(error.response?.data?.msg)
        }
    }

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">
                Reestablece tu password y no pierdas acceso a tus {''}
                <span className="text-slate-700">productos</span>
            </h1>

            {alerta && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5" role="alert">
                    <span className="block sm:inline">{alerta}</span>
                </div>
            )}

            {tokenValido && (
                <form 
                    className="my-10 bg-white shadow rounded-lg p-10"
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor="password"
                        >Nuevo Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Escribe tu Nuevo Password"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Guardar Nuevo Password"
                        className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                    />
                </form>
            )}

            {passwordModificado && (
                <Link
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                    to="/"
                >Inicia Sesión</Link>
            )}
        </>
    )
}

export default NuevoPassword
