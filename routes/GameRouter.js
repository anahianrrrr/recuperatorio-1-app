import express from 'express';
import { 
    createGame, 
    getGames, 
    getGameById, 
    updateGame, // Nueva
    deleteGame  // Nueva
} from '../controllers/GameController.js';
import { addReview, getReviewsByGame } from '../controllers/ReviewController.js';
import { validarJWT } from '../middlewares/auth.js';

const router = express.Router();

// CRUD Juegos
router.post('/', validarJWT, createGame); 
router.get('/', getGames);             // Soporta ?genre=Accion&title=Mario
router.get('/:id', getGameById);
router.put('/:id', validarJWT, updateGame);  // Ruta para Actualizar
router.delete('/:id', validarJWT, deleteGame); // Ruta para Borrar

// Rutas de Reviews (Anidadas)
router.post('/:game_id/reviews', validarJWT, addReview);
router.get('/:game_id/reviews', getReviewsByGame);

export default router;