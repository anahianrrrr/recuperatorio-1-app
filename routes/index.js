import UsuarioRouter from './UsuarioRouter.js';
import GameRouter from './GameRouter.js';
import { getReviewsByUser } from '../controllers/ReviewController.js'; // Importación directa para ruta simple

const routerAPI = (app) => {
    app.use('/api/usuarios', UsuarioRouter);
    app.use('/api/games', GameRouter);
    
    // Ruta suelta para ver reviews de un usuario
    app.get('/api/users/:user_id/reviews', getReviewsByUser);
};

export default routerAPI;