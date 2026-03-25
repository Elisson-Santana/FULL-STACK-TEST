const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const postsRouter = require('./routes/posts');

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado:', process.env.MONGODB_URI))
  .catch((err) => { console.error('Erro ao conectar no MongoDB:', err.message); process.exit(1); });

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/posts', postsRouter);

app.use((req, res) => res.status(404).json({ success: false, message: 'Rota não encontrada.' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
});

module.exports = app;
//teste

//testes1234