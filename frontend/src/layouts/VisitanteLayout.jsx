import { Outlet, Link } from 'react-router-dom';

const VisitanteLayout = () => {
  return (
    <>
      <header className="px-4 py-5 bg-zinc-900/50 border-b border-zinc-800">
        <div className="md:flex md:justify-between md:items-center container mx-auto">
          <h2 className="text-4xl text-white font-black text-center mb-5 md:mb-0">
            <Link to="/">
              Lotus Store
            </Link>
          </h2>

          <nav className="flex flex-col md:flex-row items-center gap-4">
            <Link
              to="/auth/login"
              className="font-bold text-white"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/auth/registrar"
              className="font-bold text-white"
            >
              Registrarse
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-gradient-to-br from-zinc-900 via-zinc-800/50 to-zinc-900 min-h-screen">
        <Outlet />
      </main>

      <footer className="bg-zinc-900/50 border-t border-zinc-800 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400">
            <p>© {new Date().getFullYear()} Lotus Store. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default VisitanteLayout;
