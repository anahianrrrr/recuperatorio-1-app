import express from 'express';
import { registrar } from '../controllers/UsuarioController.js'; 

const router = express.Router();

router.post('/register', registrar);

export default router;