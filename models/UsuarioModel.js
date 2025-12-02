import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'cliente',
        enum: ['cliente', 'admin'] //  diferenciar permisos
    }
});

export default mongoose.model('Usuario', usuarioSchema);