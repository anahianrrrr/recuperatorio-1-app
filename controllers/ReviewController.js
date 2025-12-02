import Review from '../models/ReviewModel.js';
import Game from '../models/GameModel.js';

// ==========================================
// FUNCIONES PARA GameRouter (Rutas anidadas)
// ==========================================

// 1. Obtener reviews de un juego específico
// GET /api/games/:game_id/reviews
export const getReviewsByGame = async (req, res) => {
    try {
        const { game_id } = req.params;
        // Buscamos reviews que tengan ese game_id
        const reviews = await Review.find({ game: game_id }).populate('user', 'nombre'); 
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Agregar review a un juego específico
// POST /api/games/:game_id/reviews
export const addReview = async (req, res) => {
    try {
        const { game_id } = req.params;
        const { rating, comment, user } = req.body; // 'user' debe venir en el body si no usas token

        // Validar que el juego exista
        const game = await Game.findById(game_id);
        if (!game) return res.status(404).json({ message: "Juego no encontrado" });

        const newReview = new Review({
            rating,
            comment,
            game: game_id,
            user // ID del usuario
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ==========================================
// FUNCIONES PARA ReviewRouter (CRUD General)
// ==========================================

// 3. Obtener TODAS las reviews del sistema
// GET /api/reviews
export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('game', 'title')
            .populate('user', 'nombre');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Obtener una review por su ID
// GET /api/reviews/:id
export const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);
        if (!review) return res.status(404).json({ message: "Reseña no encontrada" });
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 5. Crear review (Ruta genérica)
// POST /api/reviews
export const createReview = async (req, res) => {
    try {
        // Aquí esperamos que game y user vengan en el body
        const { game, user, rating, comment } = req.body;
        const newReview = new Review({ game, user, rating, comment });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 6. Actualizar review
// PUT /api/reviews/:id
export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedReview = await Review.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedReview) return res.status(404).json({ message: "Reseña no encontrada" });
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 7. Eliminar review
// DELETE /api/reviews/:id
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReview = await Review.findByIdAndDelete(id);
        if (!deletedReview) return res.status(404).json({ message: "Reseña no encontrada" });
        res.status(200).json({ message: "Reseña eliminada" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};