import { useState } from 'react'
import { Link } from 'react-router-dom'
import clientAxios from '../config/clientAxios'

const OlvidePassword = () => {
    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState('')

    const handleSubmit = async e => {
        e.preventDefault();

        if(email === '') {
            setAlerta('El Email es obligatorio')
            return
        }

        try {
            const { data } = await clientAxios.post('/users/olvide-password', { email })
            setAlerta(data.msg)
        } catch (error) {
            setAlerta(error.response?.data?.msg)
        }
    }

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl capitalize">
                Recupera tu acceso y no pierdas tus {''}
                <span className="text-slate-700">productos</span>
            </h1>

            <form 
                className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >
                {alerta && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{alerta}</span>
                    </div>
                )}

                <div className="my-5">
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <input 
                    type="submit"
                    value="Enviar Instrucciones"
                    className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                    to="/"
                >¿Ya tienes una cuenta? Inicia Sesión</Link>

                <Link
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                    to="/registrar"
                >¿No tienes una cuenta? Regístrate</Link>
            </nav>
        </>
    )
}

export default OlvidePassword
