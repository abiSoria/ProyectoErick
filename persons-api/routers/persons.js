const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// CREATE
router.post('/', async (req, res) => {
  try {
    const person = new Person(req.body);
    const saved = await person.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL (with optional filters)
router.get('/', async (req, res) => {
  try {
    const filters = {};
    if (req.query.profesion) filters.profesion = req.query.profesion;
    if (req.query.nacionalidad) filters.nacionalidad = req.query.nacionalidad;
    if (req.query.edadMin) filters.edad = { $gte: Number(req.query.edadMin) };
    const persons = await Person.find(filters).sort({ createdAt: -1 });
    res.json(persons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).json({ error: 'No encontrado' });
    res.json(person);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updated = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Person.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
