import Usuario from '../models/UsuarioModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registrar = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const nuevoUsuario = new Usuario({ nombre, email, password: passwordHash });
        await nuevoUsuario.save();
        res.status(201).json({ msg: 'Usuario creado' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al registrar', error });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });

        const esCorrecto = await bcrypt.compare(password, usuario.password);
        if (!esCorrecto) return res.status(403).json({ msg: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: usuario._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ msg: 'Error en login', error });
    }
};