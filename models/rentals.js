const mongoose = require('mongoose');
const Joi = require('joi');


const rentalSchema = mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name:{
               type:String,
               required: true,
               minlength: 5,
               maxlrngth :25 
            },
            isGold:{
                type: Boolean,
                required: true
            },
            phone:{
                type:String,
                required:true,
                minlength:10,
                maxlength:15
            }

        }),
        required:true
    },
    movie:{
        type: new mongoose.Schema({
            title:{
                type:String,
                required:true,
                minlength:3,
                maxlength:50
            },
            dailyRentalRate:{
                type:Number,
                required:true,
                min:0
                
            }
        }),
        required : true
    },
    dateOut:{
        type:Date,
        required:true,
        default:Date.now
    },
    dateReturned:{
        type:Date
    },
    rentalFee:{
        type:Number,
        min:0
    }

});

const Rental = mongoose.model('Rentals',rentalSchema);

function validateRent(rent){
    const schema ={
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()

    }
    return Joi.validate(rent,schema);
}
exports.Rental = Rental;
exports.validateRent = validateRent;