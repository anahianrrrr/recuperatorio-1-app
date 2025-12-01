import Game from '../models/GameModel.js';

// Crear juego (Ya lo tenías)
export const createGame = async (req, res) => {
    try {
        const game = new Game(req.body);
        await game.save();
        res.status(201).json(game);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// LEER JUEGOS (Con Filtros y Búsqueda)
// Cumple: Visualizar, Filtrado (2 métodos) y Búsqueda por nombre
export const getGames = async (req, res) => {
    try {
        const { genre, title } = req.query; // Capturamos parámetros de la URL
        const filters = {};

        // Filtro 1: Género exacto
        if (genre) {
            filters.genre = genre;
        }

        // Filtro 2 y Búsqueda: Título parcial (Regex)
        if (title) {
            // La 'i' hace que no distinga mayúsculas de minúsculas
            filters.title = { $regex: title, $options: 'i' }; 
        }

        const games = await Game.find(filters);
        res.json(games);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// OBTENER UNO POR ID
// Cumple: Obtener documento específico
export const getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if(!game) return res.status(404).json({msg: "Juego no encontrado"});
        res.json(game);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// ACTUALIZAR
// Cumple: Actualizar información
export const updateGame = async (req, res) => {
    try {
        const { id } = req.params;
        // { new: true } hace que te devuelva el objeto ya actualizado
        const updatedGame = await Game.findByIdAndUpdate(id, req.body, { new: true });
        
        if(!updatedGame) return res.status(404).json({msg: "No se pudo actualizar"});
        
        res.json({ msg: "Juego actualizado", game: updatedGame });
    } catch (error) {
        res.status(500).json({ error });
    }
};

// ELIMINAR
// Cumple: Eliminar documento
export const deleteGame = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGame = await Game.findByIdAndDelete(id);

        if(!deletedGame) return res.status(404).json({msg: "No se encontró el juego para borrar"});

        res.json({ msg: "Juego eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error });
    }
};