import mongoose from "mongoose";

const ventaSchema = mongoose.Schema({
    pedido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido',
        required: true
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productos: [{
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Producto'
        },
        cantidad: {
            type: Number,
            required: true
        },
        precioUnitario: {
            type: Number,
            required: true
        }
    }],
    subtotal: {
        type: Number,
        required: true
    },
    impuestos: {
        type: Number,
        required: true,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    metodoPago: {
        type: String,
        required: true,
        enum: ['EFECTIVO', 'TARJETA', 'TRANSFERENCIA']
    },
    estado: {
        type: String,
        enum: ['COMPLETADA', 'CANCELADA', 'REEMBOLSADA'],
        default: 'COMPLETADA'
    }
}, {
    timestamps: true
});

const Venta = mongoose.model("Venta", ventaSchema);
export default Venta;
