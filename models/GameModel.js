import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    releaseDate: { type: Date }
});

export default mongoose.model('Game', gameSchema);