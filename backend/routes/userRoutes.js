import express from 'express';
import { register, authenticate, profile } from '../controllers/userController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

// Autenticación, Registro y Confirmación de Usuarios
router.post('/', register); // Crear un nuevo usuario
router.post('/login', authenticate); // Autenticar usuario
router.get('/profile', checkAuth, profile); // Obtener perfil del usuario

export default router;
