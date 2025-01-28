import mongoose from "mongoose";

const configuracionSchema = mongoose.Schema({
    nombreTienda: {
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    moneda: {
        type: String,
        required: true,
        enum: ['USD', 'EUR', 'COP'],
        default: 'USD'
    },
    impuestos: {
        type: Number,
        required: true,
        default: 19 // 19% por defecto
    },
    logo: {
        type: String,
        trim: true
    },
    redesSociales: {
        facebook: String,
        instagram: String,
        twitter: String
    },
    horarioAtencion: {
        lunes: String,
        martes: String,
        miercoles: String,
        jueves: String,
        viernes: String,
        sabado: String,
        domingo: String
    }
}, {
    timestamps: true
});

const Configuracion = mongoose.model("Configuracion", configuracionSchema);
export default Configuracion;
