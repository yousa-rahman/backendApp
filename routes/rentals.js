const {Rental , validateRent} = require('../models/rentals'); 
const {Movie} = require('../models/movies'); 
const {Customer, validateCustomer} = require('../models/customer'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Fawn = require('fawn');
const auth = require('../middleware/auth');

Fawn.init(mongoose);

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', auth, async (req, res) => {
  const { error } = validateRent(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // const customers = await Customer.findById('5fbcef1377d3341f303b4cb6');
  // console.log(customers)
  // return res.send('test');

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  let rental = new Rental({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      phone: customer.phone,
      isGold: customer.isGold
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  try{
    new Fawn.Task()
    .save('rentals',rental)
    .update('movies',{_id:movie._id},{
      $inc:{numberInStock: -1}
    })
    .run();
  }
  catch(ex){
    res.status(500).send('Error',ex);
  }
 
  
  
  res.send(rental);
});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = router; 