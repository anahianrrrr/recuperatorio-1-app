import Game from '../models/GameModel.js';

// Crear juego
export const createGame = async (req, res) => {
    try {
        const game = new Game(req.body);
        await game.save();
        res.status(201).json(game);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getGames = async (req, res) => {
    try {
        const { genre, title, year } = req.query; 
        const filters = {};
//Género
        if (genre) {
            filters.genre = genre;
        }

        
        if (year) {
            const startDate = new Date(`${year}-01-01`);
            const endDate = new Date(`${year}-12-31`);
            filters.releaseDate = { $gte: startDate, $lte: endDate };
        }

        //  Búsqueda por nombre (Título)
        if (title) {
            filters.title = { $regex: title, $options: 'i' }; 
        }

        const games = await Game.find(filters);
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener por ID
export const getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if(!game) return res.status(404).json({msg: "Juego no encontrado"});
        res.json(game);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar
export const updateGame = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedGame = await Game.findByIdAndUpdate(id, req.body, { new: true });
        
        if(!updatedGame) return res.status(404).json({msg: "No se pudo actualizar"});
        
        res.json({ msg: "Juego actualizado", game: updatedGame });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar
export const deleteGame = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGame = await Game.findByIdAndDelete(id);

        if(!deletedGame) return res.status(404).json({msg: "No se encontró el juego para borrar"});

        res.json({ msg: "Juego eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};