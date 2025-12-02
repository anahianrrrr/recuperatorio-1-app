import express from 'express';
import { 
    createGame, 
    getGames, 
    getGameById, 
    updateGame, 
    deleteGame 
} from '../controllers/GameController.js';
import { addReview, getReviewsByGame } from '../controllers/ReviewController.js';

const router = express.Router();

// CRUD Juegos (Sin seguridad)
router.post('/', createGame); 
router.get('/', getGames);
router.get('/:id', getGameById);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);


router.post('/:game_id/reviews', addReview);
router.get('/:game_id/reviews', getReviewsByGame);

export default router;