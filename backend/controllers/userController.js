import User from '../models/User.js';
import generateJWT from '../helpers/generateJWT.js';

const register = async (req, res) => {
    try {
        const { email, nombre, password } = req.body;
        const userExists = await User.findOne({ email });

        if(userExists) {
            const error = new Error('Usuario ya registrado');
            return res.status(400).json({ msg: error.message });
        }

        const user = new User({
            name: nombre,
            email,
            password
        });
        const userSaved = await user.save();

        res.json({
            msg: 'Usuario creado correctamente',
            token: generateJWT(userSaved._id)
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

const authenticate = async (req, res) => {
    const { email, password } = req.body;

    // Comprobar si el usuario existe
    const user = await User.findOne({ email });
    if(!user) {
        const error = new Error('El Usuario no existe');
        return res.status(404).json({ msg: error.message });
    }

    // Comprobar su password
    if(await user.checkPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id)
        });
    } else {
        const error = new Error('El password es incorrecto');
        return res.status(403).json({ msg: error.message });
    }
};

const profile = async (req, res) => {
    const { user } = req;
    res.json(user);
};

export {
    register,
    authenticate,
    profile
};
