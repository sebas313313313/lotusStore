import express from 'express';
import {
    obtenerCategorias,
    obtenerCategoria,
    nuevaCategoria,
    editarCategoria,
    eliminarCategoria
} from '../controllers/categoriaController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

// Rutas Públicas
router.get('/', obtenerCategorias);
router.get('/:id', obtenerCategoria);

// Rutas Privadas (requieren autenticación)
router.post('/', checkAuth, nuevaCategoria);
router.put('/:id', checkAuth, editarCategoria);
router.delete('/:id', checkAuth, eliminarCategoria);

export default router;
