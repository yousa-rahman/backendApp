const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express') ;
const router = express.Router();
const {Genre, validateGenre} = require('../models/genres');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
require('express-async-errors');

  
  router.get('/', async(req, res, next) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
       
  });
  
  router.post('/', auth, async(req, res) => {
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = new Genre({name: req.body.name});
    await genre.save();
    res.send(genre);
  });
  
  router.put('/:id', async(req, res) => {
    const genre = await Genre.findByIdAndUpdate(req.params.id,{name: req.body.name},{new:true});
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
   res.send(genre);
  });
  
  router.delete('/:id', [auth, admin],async(req, res) => {
    const genre = await Genre.findByIdAndRemove({_id: req.params.id});
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
     
    res.send(genre);
  });
  
  router.get('/:id', async(req, res) => {
    const genre = await findById({_id:id});
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
  });

  module.exports = {genreSchema : Genre, Genre : Genre};
  module.exports = router;
