import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import productRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import { notFoundHandler, errorHandler } from './middlewares/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);

// Rutas no definidas
app.use(notFoundHandler);
// Manejo central de errores
app.use(errorHandler);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
