
import { Router } from 'express';
import respuesta2Router from './Respuesta2Router.js';
import respuesta3Router from './Respuesta3Router.js';
import respuesta4Router from './Respuesta4Router.js';

const mainRouter = Router();

console.log("En mainRouter");
// Registrar las respuestas
mainRouter.use('/respuesta/2',respuesta2Router);
mainRouter.use('/respuesta/3',respuesta3Router);
mainRouter.use('/respuesta/4',respuesta4Router);

export default mainRouter;

