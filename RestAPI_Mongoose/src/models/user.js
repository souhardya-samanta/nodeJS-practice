const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
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
        default: 0
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error('Invalid Email ID')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(val) {
            if (val.length <= 6 || val.includes('password')) {  //or minlength: 7
                throw new Error('Invalid Password')
            }
        }
    },
    tokens:[
        {
            token:{
                type: String,
                require:true
            }
        }
    ]
})

UserSchema.methods.generateAuthToken = async function () {
    const user=this
    const token=jwt.sign({_id: user._id.toString()},"c4e10aa1ab2d6201eb24c640")
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login!')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

UserSchema.pre('save', async function (next) {
    const user = this
    console.log("just before saving")
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


const User = mongoose.model('User', UserSchema)
module.exports = User;