import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './adapters/routes/routes';

const app = express();
app.use(bodyParser.json());

// Rota básica para a raiz da API
app.get('/', (req, res) => {
  res.send('Welcome to the Wefit Hexagonal API');
});

// Usar as rotas do UserController
app.use('/api', userRoutes);

export default app;
