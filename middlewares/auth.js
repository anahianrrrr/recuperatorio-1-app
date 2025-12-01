import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const validarJWT = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, permiso denegado' });
    }

    try {
        // Limpiamos el prefijo "Bearer " si existe
        const tokenLimpio = token.startsWith("Bearer ") ? token.slice(7) : token;
        const decoded = jwt.verify(tokenLimpio, process.env.SECRET_KEY);
        
        req.userId = decoded.id; // Guardamos el ID para usarlo en los controladores
        next();
    } catch (error) {
        res.status(403).json({ msg: 'Token inválido' });
    }
};