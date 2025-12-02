import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Importar rutas
import GameRouter from './routes/GameRouter.js';
import UsuarioRouter from './routes/UsuarioRouter.js';
import ReviewRouter from './routes/ReviewRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/games', GameRouter);
app.use('/api/usuarios', UsuarioRouter);
app.use('/api/reviews', ReviewRouter);

// Conexión a Base de Datos
mongoose.connect(process.env.URI_DB)
    .then(() => console.log('Base de datos conectada 🚀'))
    .catch(err => console.error('Error conectando a DB:', err));

// --- CUMPLIMIENTO PUNTO 1: Página Principal con HTML y Pie de Página ---
app.get('/', (req, res) => {
    const htmlResponse = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>API de Juegos</title>
            <style>
                body { font-family: sans-serif; padding: 20px; text-align: center; }
                footer { 
                    margin-top: 50px; 
                    padding: 20px; 
                    background-color: #f0f0f0; 
                    border-top: 1px solid #ccc;
                }
                .endpoints { text-align: left; display: inline-block; }
            </style>
        </head>
        <body>
            <h1>🎮 API de Juegos y Reseñas</h1>
            <p>Bienvenido. Utiliza los siguientes endpoints para acceder a los datos:</p>
            
            <div class="endpoints">
                <h3>Rutas Principales:</h3>
                <ul>
                    <li><a href="/api/games">/api/games</a> (Ver todos los juegos)</li>
                    <li><a href="/api/reviews">/api/reviews</a> (Ver todas las reseñas)</li>
                </ul>
            </div>

            <footer>
                <p><strong>Nombre y Apellido:</strong> acebo anahi </p>
                <p><strong>Materia:</strong> Aplicaciones Híbridas</p>
                <p><strong>Docente:</strong> Jonathan cruz</p>
                
            </footer>
        </body>
        </html>
    `;
    res.send(htmlResponse);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});