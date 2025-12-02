import Usuario from '../models/UsuarioModel.js';
import bcrypt from 'bcrypt';


export const registrar = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        
       
        const existeUsuario = await Usuario.findOne({ email });
        if (existeUsuario) {
            return res.status(400).json({ msg: 'El correo ya está registrado' });
        }

        
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        
        const nuevoUsuario = new Usuario({ 
            nombre, 
            email, 
            password: passwordHash 
        });
        
        await nuevoUsuario.save();

        
        res.status(201).json({ 
            msg: 'Usuario creado exitosamente',
            user_id: nuevoUsuario._id 
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error al registrar usuario', error: error.message });
    }
};