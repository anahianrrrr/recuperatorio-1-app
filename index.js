import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routerAPI from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Conexión a DB
mongoose.connect(process.env.URI_DB)
    .then(() => console.log('Base de datos conectada 🚀'))
    .catch(err => console.error('Error de conexión a DB:', err));

// Rutas
routerAPI(app);

app.get('/', (req, res) => {
    res.send('<h1>API de Juegos Funcionando 🎮</h1>');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});