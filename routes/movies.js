const Joi = require('joi');
const { Movie, validateMovie } = require('../models/movies');
const {Genre} = require('../models/genres');
const mongoose = require('mongoose');
const express = require('express') ;
const router = express.Router();
const auth = require('../middleware/auth')

  
  router.get('/', async(req, res) => {
    const movie = await Movies.find().sort('title');
    res.send(movie);
  });
  
  router.post('/',auth, async(req, res) => {
    const { error } = validateMovie(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');
  
    const movie = new Movies({ 
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
      });
      await movie.save();
      
      res.send(movie);
  });
  
  router.put('/:id', async(req, res) => {
    const movie = await Movies.findByIdAndUpdate(req.params.id,{name: req.body.name},{new:true});
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
    const { error } = validateMovie(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
   res.send(movie);
  });
  
  router.delete('/:id', async(req, res) => {
    const movie = await Movies.deleteOne({_id: req.params.id});
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
     
    res.send(movie);
  });
  
  router.get('/:id', async(req, res) => {
    const movie = await findById({_id:id});
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.send(movie);
  });

  module.exports = router;
 