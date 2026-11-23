import { Router } from 'express';
import { getPaymentsAndTotal } from '../controllers/Respuesta2Controller.js';

const router = Router();

router.get('/:id', getPaymentsAndTotal );

export default router;