import Producto from '../models/Producto.js';
import fs from 'fs';
import path from 'path';

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
        const { categoria } = req.query;
        const query = categoria ? { categoria } : {};

        const productos = await Producto.find(query)
            .populate('categoria', 'nombre')
            .populate('creador', 'name');
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

// Obtener un producto
const obtenerProducto = async (req, res) => {
    const { id } = req.params;

    try {
        const producto = await Producto.findById(id)
            .populate('categoria', 'nombre')
            .populate('creador', 'name');
        
        if(!producto) {
            const error = new Error('Producto no encontrado');
            return res.status(404).json({ msg: error.message });
        }

        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

// Crear nuevo producto
const nuevoProducto = async (req, res) => {
    try {
        const producto = new Producto(req.body);
        producto.creador = req.user._id;
        
        if(req.file) {
            producto.imagen = req.file.filename;
        }

        const productoAlmacenado = await producto.save();
        res.json(productoAlmacenado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

// Editar producto
const editarProducto = async (req, res) => {
    const { id } = req.params;

    try {
        const producto = await Producto.findById(id);
        
        if(!producto) {
            const error = new Error('Producto no encontrado');
            return res.status(404).json({ msg: error.message });
        }

        if(producto.creador.toString() !== req.user._id.toString()) {
            const error = new Error('No tienes los permisos necesarios');
            return res.status(401).json({ msg: error.message });
        }

        // Si hay una nueva imagen, eliminar la anterior
        if(req.file && producto.imagen) {
            const imagePath = path.join('./uploads/', producto.imagen);
            if(fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        producto.nombre = req.body.nombre || producto.nombre;
        producto.descripcion = req.body.descripcion || producto.descripcion;
        producto.precio = req.body.precio || producto.precio;
        producto.categoria = req.body.categoria || producto.categoria;
        producto.stock = req.body.stock || producto.stock;
        if(req.file) {
            producto.imagen = req.file.filename;
        }

        const productoAlmacenado = await producto.save();
        res.json(productoAlmacenado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

// Eliminar producto
const eliminarProducto = async (req, res) => {
    const { id } = req.params;

    try {
        const producto = await Producto.findById(id);
        
        if(!producto) {
            const error = new Error('Producto no encontrado');
            return res.status(404).json({ msg: error.message });
        }

        if(producto.creador.toString() !== req.user._id.toString()) {
            const error = new Error('No tienes los permisos necesarios');
            return res.status(401).json({ msg: error.message });
        }

        // Eliminar la imagen si existe
        if(producto.imagen) {
            const imagePath = path.join('./uploads/', producto.imagen);
            if(fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await producto.deleteOne();
        res.json({ msg: 'Producto eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

// Obtener productos por categoría
const obtenerProductosPorCategoria = async (req, res) => {
    const { categoriaId } = req.params;

    try {
        const productos = await Producto.find({ categoria: categoriaId })
            .populate('categoria', 'nombre')
            .populate('creador', 'name');
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

export {
    obtenerProductos,
    obtenerProducto,
    nuevoProducto,
    editarProducto,
    eliminarProducto,
    obtenerProductosPorCategoria
};
