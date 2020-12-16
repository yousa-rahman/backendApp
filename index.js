const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customer = require('./routes/customer');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/user');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

if(!config.get('jwtPrivateKey')){
    console.error('ERROR: FATAL error..');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly',{ useNewUrlParser: true , useUnifiedTopology: true })
    .then(()=>console.log('Connected to MongoDB...'))
    .catch(err=>console.error(err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers',customer)
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth',auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));