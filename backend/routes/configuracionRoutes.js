import express from 'express';
import {
    obtenerConfiguracion,
    actualizarConfiguracion
} from '../controllers/configuracionController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.route('/')
    .get(checkAuth, obtenerConfiguracion)
    .put(checkAuth, actualizarConfiguracion);

export default router;
