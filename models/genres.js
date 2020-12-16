const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minLenghth: 5, 
        maxLength: 60}
  })

  const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
  }

exports.Genre = Genre;
exports.validateGenre = validateGenre;
exports.genreSchema = genreSchema;