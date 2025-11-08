const express = require('express');
const connectDB = require('./config/bd');
const cors = require('cors'); 

connectDB();
const app = express();

app.use(cors()); 

app.use(express.json({ extended: false }));
app.use('/api/alunos', require('./routes/alunos'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor da API iniciado na porta ${PORT}`));