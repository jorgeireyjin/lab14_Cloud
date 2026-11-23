import { Router } from 'express';
import { getClientesConCantidadDePagos } from '../controllers/Respuesta3Controller.js';

const router = Router();

router.get('/:cantidad', getClientesConCantidadDePagos );

export default router;