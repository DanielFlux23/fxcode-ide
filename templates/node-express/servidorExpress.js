// servidorExpress.js - servidor Express
const express = require('express'); // traz o Express
const app = express();

// rota simples
app.get('/', (req, res) => {
  res.send('Olá — servidor Express mínimo funcionando!');
});

// porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
