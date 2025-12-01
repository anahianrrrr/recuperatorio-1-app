import Review from '../models/ReviewModel.js';
import Game from '../models/GameModel.js';

export const addReview = async (req, res) => {
    try {
        const { game_id } = req.params;
        const { rating, comment } = req.body;
        const userId = req.userId; // Viene del middleware

        // Validar que el juego exista
        const game = await Game.findById(game_id);
        if (!game) return res.status(404).json({ msg: 'Juego no existe' });

        const newReview = new Review({ rating, comment, game: game_id, user: userId });
        await newReview.save();
        res.status(201).json({ msg: 'Reseña creada', review: newReview });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getReviewsByGame = async (req, res) => {
    try {
        const { game_id } = req.params;
        const reviews = await Review.find({ game: game_id }).populate('user', 'nombre');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getReviewsByUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const reviews = await Review.find({ user: user_id }).populate('game', 'title');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error });
    }
};