import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productoRoutes from './routes/productoRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';

// Configuración de __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const app = express();
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Configurar CORS
const whitelist = ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
    origin: whitelist,
    credentials: true
}));

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routing
app.use('/api/users', userRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/categorias', categoriaRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
