import express from 'express';
import {
    obtenerPedidos,
    nuevoPedido,
    obtenerPedido,
    actualizarPedido,
    eliminarPedido
} from '../controllers/pedidoController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.route('/')
    .get(checkAuth, obtenerPedidos)
    .post(checkAuth, nuevoPedido);

router.route('/:id')
    .get(checkAuth, obtenerPedido)
    .put(checkAuth, actualizarPedido)
    .delete(checkAuth, eliminarPedido);

export default router;
