import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import useAuth from '../hooks/useAuth'

const ProtectedRoute = () => {
  const { auth, cargando } = useAuth()

  if(cargando) return 'Cargando...'

  return (
    <>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-10 bg-gray-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default ProtectedRoute
