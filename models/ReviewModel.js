import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Review', reviewSchema);