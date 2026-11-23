import express from 'express';
import dotenv from 'dotenv';
import mainRouter from './routes/index.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar JSON
app.use(express.json() );


// Ruta base de las APIs
app.use('/api/v1', mainRouter);

// Manejo de errores 404
app.use( (req,res) => {
    console.log("Petición no encontrada:", req.method, req.originalUrl);
    res.status(404).json( { msg : "ruta no existe"} );
});

// Iniciar el server
app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});
