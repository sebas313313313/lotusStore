import express from 'express';
import {
    obtenerProductos,
    obtenerProducto,
    nuevoProducto,
    editarProducto,
    eliminarProducto,
    obtenerProductosPorCategoria
} from '../controllers/productoController.js';
import checkAuth from '../middleware/checkAuth.js';
import upload from '../middleware/uploadImage.js';

const router = express.Router();

// Rutas Públicas
router.get('/', obtenerProductos);
router.get('/categoria/:categoriaId', obtenerProductosPorCategoria); 
router.get('/:id', obtenerProducto);

// Rutas Privadas (requieren autenticación)
router.post('/', checkAuth, upload.single('imagen'), nuevoProducto);
router.put('/:id', checkAuth, upload.single('imagen'), editarProducto);
router.delete('/:id', checkAuth, eliminarProducto);

export default router;
