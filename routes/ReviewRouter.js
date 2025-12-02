import express from 'express';
import { 
    getReviews, 
    getReviewById, 
    createReview, 
    updateReview, 
    deleteReview 
} from '../controllers/ReviewController.js';

const reviewRouter = express.Router();

// Rutas sin middlewar
reviewRouter.get('/', getReviews);
reviewRouter.get('/:id', getReviewById);
reviewRouter.post('/', createReview);
reviewRouter.put('/:id', updateReview);
reviewRouter.delete('/:id', deleteReview);

export default reviewRouter;