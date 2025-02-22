import app from './app'; // Ajuste o caminho conforme necessário

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
