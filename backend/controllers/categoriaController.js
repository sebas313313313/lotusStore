import Categoria from '../models/Categoria.js';

// Obtener todas las categorías
const obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find().populate('creador', 'name');
        res.json(categorias);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

// Obtener una categoría por ID
const obtenerCategoria = async (req, res) => {
    const { id } = req.params;

    try {
        const categoria = await Categoria.findById(id).populate('creador', 'name');
        
        if(!categoria) {
            const error = new Error('Categoría no encontrada');
            return res.status(404).json({ msg: error.message });
        }

        res.json(categoria);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

// Crear nueva categoría
const nuevaCategoria = async (req, res) => {
    const categoria = new Categoria(req.body);
    categoria.creador = req.user._id;

    try {
        const categoriaAlmacenada = await categoria.save();
        res.json(categoriaAlmacenada);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

// Editar categoría
const editarCategoria = async (req, res) => {
    const { id } = req.params;

    try {
        const categoria = await Categoria.findById(id);
        
        if(!categoria) {
            const error = new Error('Categoría no encontrada');
            return res.status(404).json({ msg: error.message });
        }

        if(categoria.creador.toString() !== req.user._id.toString()) {
            const error = new Error('No tienes los permisos necesarios');
            return res.status(401).json({ msg: error.message });
        }

        categoria.nombre = req.body.nombre || categoria.nombre;
        categoria.descripcion = req.body.descripcion || categoria.descripcion;

        const categoriaAlmacenada = await categoria.save();
        res.json(categoriaAlmacenada);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

// Eliminar categoría
const eliminarCategoria = async (req, res) => {
    const { id } = req.params;

    try {
        const categoria = await Categoria.findById(id);
        
        if(!categoria) {
            const error = new Error('Categoría no encontrada');
            return res.status(404).json({ msg: error.message });
        }

        if(categoria.creador.toString() !== req.user._id.toString()) {
            const error = new Error('No tienes los permisos necesarios');
            return res.status(401).json({ msg: error.message });
        }

        await categoria.deleteOne();
        res.json({ msg: 'Categoría eliminada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

export {
    obtenerCategorias,
    obtenerCategoria,
    nuevaCategoria,
    editarCategoria,
    eliminarCategoria
};
