import Configuracion from '../models/Configuracion.js';

const obtenerConfiguracion = async (req, res) => {
    try {
        let configuracion = await Configuracion.findOne();
        
        if(!configuracion) {
            // Si no existe configuración, crear una por defecto
            configuracion = new Configuracion({
                nombreTienda: 'Lotus Store',
                direccion: 'Por definir',
                telefono: 'Por definir',
                email: 'Por definir',
                moneda: 'USD',
                impuestos: 19
            });
            await configuracion.save();
        }

        res.json(configuracion);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

const actualizarConfiguracion = async (req, res) => {
    try {
        let configuracion = await Configuracion.findOne();
        
        if(!configuracion) {
            configuracion = new Configuracion(req.body);
        } else {
            configuracion.nombreTienda = req.body.nombreTienda || configuracion.nombreTienda;
            configuracion.direccion = req.body.direccion || configuracion.direccion;
            configuracion.telefono = req.body.telefono || configuracion.telefono;
            configuracion.email = req.body.email || configuracion.email;
            configuracion.moneda = req.body.moneda || configuracion.moneda;
            configuracion.impuestos = req.body.impuestos || configuracion.impuestos;
            configuracion.logo = req.body.logo || configuracion.logo;
            configuracion.redesSociales = req.body.redesSociales || configuracion.redesSociales;
            configuracion.horarioAtencion = req.body.horarioAtencion || configuracion.horarioAtencion;
        }

        await configuracion.save();
        res.json(configuracion);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

export {
    obtenerConfiguracion,
    actualizarConfiguracion
};
