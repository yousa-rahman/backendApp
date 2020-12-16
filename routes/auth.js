const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {User} = require('../models/users');


router.post('/',async(req,res)=>{
    const { error } = validateUser(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Inavlid Email or Password');

    const password = await bcrypt.compare(req.body.password, user.password);
    if(!password) return res.status(400).send('Inavlid Email or Password');

    const token = user.generateAuthToken();
    res.send(token);
});


function validateUser(user) {
    const schema = {
      email: Joi.string().required().email(),
      password: Joi.string().required()
    };
  
    return Joi.validate(user, schema);
  }


module.exports = router;