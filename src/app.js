import express from 'express';
import dotenv from 'dotenv';
import mainRouter from './routes/index.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;



const allowedOrigins = [
  'https://lab14-front2.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
];
app.use(
  cors({
    origin: (origin, callback) => {
      // Permite peticiones sin Origin (ej. curl, Postman o server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origen no permitido por CORS: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

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
