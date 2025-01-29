import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Sidebar = () => {
    const { auth, cerrarSesionAuth } = useAuth()

    return (
        <div className="bg-black h-screen flex flex-col gap-5 p-2 w-[300px]">
            {/* Perfil */}
            <div className="flex items-center justify-between px-6 py-2">
                <div className="flex gap-5 items-center">
                    <img 
                        className="w-[60px] h-[60px] rounded-full"
                        src="/img/profile-default.jpg" 
                        alt="profile picture" 
                    />
                    <div>
                        <div className="text-white font-bold text-2xl">{auth.name}</div>
                        <div className="text-sm text-zinc-500 font-semibold">{auth.email}</div>
                    </div>
                </div>
                <div className="text-white scale-125 relative cursor-pointer hover:ring hover:ring-white hover:bg-white hover:text-black rounded-full">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                        </svg>
                    </div>
                    <div className="absolute top-0 left-0 bg-red-500 text-white font-semibold text-xs w-[14px] h-[14px] flex items-center justify-center rounded-full">
                        4
                    </div>
                </div>
            </div>

            {/* Menú */}
            <div className="flex flex-col gap-2">
                <Link to="/admin"
                    className="text-white bg-black flex items-center gap-2 hover:bg-white hover:text-black rounded-full px-6 py-4 text-xl font-medium transition duration-250"
                >
                    <svg className="h-7 w-7" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx="12" cy="13" r="2" />
                        <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                        <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
                    </svg>
                    Dashboard
                </Link>

                <Link to="/admin/productos"
                    className="text-white bg-black flex items-center gap-2 hover:bg-white hover:text-black rounded-full px-6 py-4 text-xl font-medium transition duration-250"
                >
                    <svg className="h-7 w-7" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                        <path d="M20 7.5v9l-4-2.25L12 17l-4-2.25L4 17v-9l4 2.25L12 8l4 2.25L20 7.5z"></path>
                    </svg>
                    Productos
                </Link>

                <Link to="/admin/pedidos"
                    className="text-white bg-black flex items-center gap-2 hover:bg-white hover:text-black rounded-full px-6 py-4 text-xl font-medium transition duration-250"
                >
                    <svg className="h-7 w-7" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                    Pedidos
                </Link>

                <Link to="/admin/clientes"
                    className="text-white bg-black flex items-center gap-2 hover:bg-white hover:text-black rounded-full px-6 py-4 text-xl font-medium transition duration-250"
                >
                    <svg className="h-7 w-7" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    Clientes
                </Link>

                <Link to="/admin/categorias"
                    className="text-white bg-black flex items-center gap-2 hover:bg-white hover:text-black rounded-full px-6 py-4 text-xl font-medium transition duration-250"
                >
                    <svg className="h-7 w-7" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                        <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                    Categorías
                </Link>

                <Link to="/admin/ventas"
                    className="text-white bg-black flex items-center gap-2 hover:bg-white hover:text-black rounded-full px-6 py-4 text-xl font-medium transition duration-250"
                >
                    <svg className="h-7 w-7" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                        <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                    Ventas
                </Link>

                <Link to="/admin/configuracion"
                    className="text-white bg-black flex items-center gap-2 hover:bg-white hover:text-black rounded-full px-6 py-4 text-xl font-medium transition duration-250"
                >
                    <svg className="h-7 w-7" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Configuración
                </Link>

                <button
                    onClick={cerrarSesionAuth}
                    className="text-white bg-black flex items-center gap-2 hover:bg-white hover:text-black rounded-full px-6 py-4 text-xl font-medium transition duration-250 w-full"
                >
                    <svg className="h-7 w-7" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"></path>
                    </svg>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    )
}

export default Sidebar
