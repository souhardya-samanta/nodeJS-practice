const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        validate(val) {
            if (val < 0) {
                throw new Error('Age must be a positive number')
            }
        },
        default:0
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error('Invalid Email ID')
            }
        }
    },
    password:{
        type: String,
        required:true,
        trim:true,
        validate(val){
            if(val.length<=6 || val.includes('password')){  //or minlength: 7
                throw new Error('Invalid Password')
            }
        }
    }
})
module.exports = User;