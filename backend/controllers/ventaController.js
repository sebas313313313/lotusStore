import Venta from '../models/Venta.js';
import Pedido from '../models/Pedido.js';

const obtenerVentas = async (req, res) => {
    try {
        const ventas = await Venta.find()
            .populate('cliente', 'nombre email')
            .populate('productos.producto', 'nombre precio')
            .populate('pedido');
        res.json(ventas);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

const nuevaVenta = async (req, res) => {
    try {
        const { pedidoId, metodoPago } = req.body;

        // Obtener el pedido
        const pedido = await Pedido.findById(pedidoId)
            .populate('productos.producto');
        
        if(!pedido) {
            return res.status(404).json({ msg: 'Pedido no encontrado' });
        }

        // Crear la venta
        const venta = new Venta({
            pedido: pedidoId,
            cliente: pedido.cliente,
            productos: pedido.productos.map(item => ({
                producto: item.producto._id,
                cantidad: item.cantidad,
                precioUnitario: item.producto.precio
            })),
            subtotal: pedido.total,
            impuestos: pedido.total * 0.19, // 19% de impuestos
            total: pedido.total * 1.19,
            metodoPago
        });

        // Guardar la venta
        await venta.save();

        // Actualizar el estado del pedido
        pedido.estado = 'COMPLETADO';
        await pedido.save();

        res.json(venta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

const obtenerVenta = async (req, res) => {
    const { id } = req.params;

    try {
        const venta = await Venta.findById(id)
            .populate('cliente', 'nombre email')
            .populate('productos.producto', 'nombre precio')
            .populate('pedido');

        if(!venta) {
            return res.status(404).json({ msg: 'Venta no encontrada' });
        }

        res.json(venta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

const obtenerEstadisticas = async (req, res) => {
    try {
        // Obtener ventas del último mes
        const fechaInicio = new Date();
        fechaInicio.setMonth(fechaInicio.getMonth() - 1);

        const ventasMes = await Venta.find({
            createdAt: { $gte: fechaInicio },
            estado: 'COMPLETADA'
        });

        // Calcular totales
        const totalVentas = ventasMes.reduce((acc, venta) => acc + venta.total, 0);
        const totalProductos = ventasMes.reduce((acc, venta) => 
            acc + venta.productos.reduce((sum, prod) => sum + prod.cantidad, 0), 0);

        // Agrupar ventas por método de pago
        const ventasPorMetodo = await Venta.aggregate([
            {
                $match: {
                    createdAt: { $gte: fechaInicio },
                    estado: 'COMPLETADA'
                }
            },
            {
                $group: {
                    _id: '$metodoPago',
                    total: { $sum: '$total' },
                    cantidad: { $sum: 1 }
                }
            }
        ]);

        res.json({
            totalVentas,
            totalProductos,
            cantidadVentas: ventasMes.length,
            ventasPorMetodo,
            promedioVenta: totalVentas / ventasMes.length || 0
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

const cancelarVenta = async (req, res) => {
    const { id } = req.params;

    try {
        const venta = await Venta.findById(id);

        if(!venta) {
            return res.status(404).json({ msg: 'Venta no encontrada' });
        }

        venta.estado = 'CANCELADA';
        await venta.save();

        // También cancelar el pedido asociado
        const pedido = await Pedido.findById(venta.pedido);
        if(pedido) {
            pedido.estado = 'CANCELADO';
            await pedido.save();
        }

        res.json(venta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

export {
    obtenerVentas,
    nuevaVenta,
    obtenerVenta,
    obtenerEstadisticas,
    cancelarVenta
};
