import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Sidebar from '../components/Sidebar';

const RutaProtegida = () => {
    const { auth, cargando } = useAuth();

    if(cargando) return 'Cargando...';
    
    return (
        <>
            {auth._id ? (
                <div className="flex">
                    <Sidebar />
                    <main className="flex-1 bg-gray-100 min-h-screen">
                        <Outlet />
                    </main>
                </div>
            ) : <Navigate to="/" />}
        </>
    )
}

export default RutaProtegida;
