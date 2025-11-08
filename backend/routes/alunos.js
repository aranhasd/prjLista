const express = require('express');
const router = express.Router();
const Aluno = require('../models/alunos'); 
router.post('/', async (req, res) => {
  try {
    const novoAluno = new Aluno(req.body);
    const aluno = await novoAluno.save();
    res.status(201).json(aluno);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ erro: err.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);

    if (!aluno) {
      return res.status(404).json({ erro: 'Aluno não encontrado' });
    }
    res.json(aluno);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
});
router.put('/:id', async (req, res) => {
  try {
    let aluno = await Aluno.findById(req.params.id);

    if (!aluno) {
      return res.status(404).json({ erro: 'Aluno não encontrado' });
    }

    aluno = await Aluno.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, 
      { new: true }      
    );

    res.json(aluno);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    let aluno = await Aluno.findById(req.params.id);

    if (!aluno) {
      return res.status(404).json({ erro: 'Aluno não encontrado' });
    }

    await Aluno.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Aluno excluído com sucesso' });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
});

module.exports = router;