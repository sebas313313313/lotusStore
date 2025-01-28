import express from 'express';
import {
    obtenerVentas,
    nuevaVenta,
    obtenerVenta,
    obtenerEstadisticas,
    cancelarVenta
} from '../controllers/ventaController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.route('/')
    .get(checkAuth, obtenerVentas)
    .post(checkAuth, nuevaVenta);

router.get('/estadisticas', checkAuth, obtenerEstadisticas);

router.route('/:id')
    .get(checkAuth, obtenerVenta)
    .put(checkAuth, cancelarVenta);

export default router;
