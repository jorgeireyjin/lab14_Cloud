import { Router } from 'express';
import { getConteoPorVocal } from '../controllers/Respuesta4Controller.js';

const router = Router();

router.get('/:vocal', getConteoPorVocal );

export default router;