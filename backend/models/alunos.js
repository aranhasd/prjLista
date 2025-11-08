const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlunoSchema = new Schema({
  codigo: {
    type: String,
    required: [true, 'O campo código é obrigatório'],
    unique: true 
  },
  nome: {
    type: String,
    required: [true, 'O campo nome é obrigatório']
  },
  cep: {
    type: String,
    required: false 
  },
  rua: {
    type: String,
    required: false 
  },
  numero: {
    type: String,
    required: false 
  },
  cidade: {
    type: String,
    required: false 
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Aluno', AlunoSchema);