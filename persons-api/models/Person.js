const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  profesion: { type: String },
  nacionalidad: { type: String },
  estatura: { type: Number },
  estadoCivil: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Person', PersonSchema);
                                                                                  