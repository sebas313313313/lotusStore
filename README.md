# Tienda Lotus Store

Aplicación web de e-commerce desarrollada con el stack MERN (MongoDB, Express.js, React, Node.js).

## Características

- Frontend desarrollado con React y Tailwind CSS
- Backend con Node.js y Express
- Base de datos MongoDB
- Sistema de autenticación
- Roles de usuario (administrador y visitante)
- Diseño responsive

## Estructura del Proyecto

```
tienda-lotus/
├── frontend/           # Aplicación React
│   ├── src/
│   │   ├── assets/    # Recursos estáticos
│   │   ├── components/# Componentes React
│   │   ├── config/    # Configuraciones
│   │   ├── context/   # Contextos de React
│   │   ├── hooks/     # Custom hooks
│   │   ├── layouts/   # Layouts de la aplicación
│   │   └── pages/     # Páginas principales
│   └── ...
└── backend/           # Servidor Node.js
    ├── config/        # Configuraciones
    ├── controllers/   # Controladores
    ├── helpers/       # Funciones auxiliares
    ├── middleware/    # Middleware
    ├── models/        # Modelos MongoDB
    ├── routes/        # Rutas API
    └── ...
```

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instalar dependencias del frontend:
```bash
cd frontend
npm install
```

3. Instalar dependencias del backend:
```bash
cd backend
npm install
```

4. Configurar variables de entorno:
   - Crear archivo `.env` en la carpeta backend
   - Definir las variables necesarias (ver .env.example)

## Desarrollo

Para ejecutar en modo desarrollo:

```bash
# En la raíz del proyecto
npm run dev
```

Esto iniciará tanto el frontend como el backend en modo desarrollo.

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Tecnologías Utilizadas

- Frontend:
  - React
  - Tailwind CSS
  - React Router DOM
  - Axios

- Backend:
  - Node.js
  - Express
  - MongoDB
  - JWT para autenticación

## Licencia

MIT
