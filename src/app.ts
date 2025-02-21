import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// Definir rotas e controladores

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
