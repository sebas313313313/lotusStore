import mongoose from "mongoose";

const pedidoSchema = mongoose.Schema({
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
            required: true,
            default: 1
        }
    }],
    total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['PENDIENTE', 'COMPLETADO', 'CANCELADO'],
        default: 'PENDIENTE'
    },
    direccionEnvio: {
        calle: String,
        ciudad: String,
        estado: String,
        codigoPostal: String,
        pais: String
    }
}, {
    timestamps: true
});

const Pedido = mongoose.model("Pedido", pedidoSchema);
export default Pedido;
