import Pedido from '../models/Pedido.js';
import User from '../models/User.js';

const obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find()
            .populate('cliente', 'nombre email')
            .populate('productos.producto', 'nombre precio');
        res.json(pedidos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

const nuevoPedido = async (req, res) => {
    try {
        const pedido = new Pedido(req.body);
        pedido.cliente = req.user._id; // El usuario autenticado es el cliente
        await pedido.save();
        res.json(pedido);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

const obtenerPedido = async (req, res) => {
    const { id } = req.params;

    try {
        const pedido = await Pedido.findById(id)
            .populate('cliente', 'nombre email')
            .populate('productos.producto', 'nombre precio');

        if(!pedido) {
            return res.status(404).json({ msg: 'Pedido no encontrado' });
        }

        res.json(pedido);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

const actualizarPedido = async (req, res) => {
    const { id } = req.params;

    try {
        const pedido = await Pedido.findById(id);

        if(!pedido) {
            return res.status(404).json({ msg: 'Pedido no encontrado' });
        }

        pedido.estado = req.body.estado || pedido.estado;
        pedido.productos = req.body.productos || pedido.productos;
        pedido.total = req.body.total || pedido.total;
        pedido.direccionEnvio = req.body.direccionEnvio || pedido.direccionEnvio;

        await pedido.save();
        res.json(pedido);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

const eliminarPedido = async (req, res) => {
    const { id } = req.params;

    try {
        const pedido = await Pedido.findById(id);

        if(!pedido) {
            return res.status(404).json({ msg: 'Pedido no encontrado' });
        }

        await pedido.deleteOne();
        res.json({ msg: 'Pedido eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

export {
    obtenerPedidos,
    nuevoPedido,
    obtenerPedido,
    actualizarPedido,
    eliminarPedido
};
