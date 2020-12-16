const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minLenghth: 5, 
        maxLength: 60},
    email:{
        type: String,
        required: true,
        minlength:10,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin: Boolean
  })

  userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id, isAdmin: this.isAdmin},config.get('jwtPrivateKey'));
    return token;

  }

  const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
      name: Joi.string().min(3).required(),
      email: Joi.string().required().email(),
      password: Joi.string().required()
    };
  
    return Joi.validate(user, schema);
  }

exports.User = User;
exports.validateUser = validateUser;
exports.userSchema = userSchema;