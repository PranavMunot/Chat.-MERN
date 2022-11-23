const mongoose = require('mongoose')
const { validate } = require('uuid')
const validator = require('validator')


const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: [true, 'Please Provide Mail'],
        validate: [validator.isEmail, 'please enter Mail in correct format.'],
        unique: true
    },
    password: {
        type: 'string',
        required: [true, 'Password is Must'],
        select: false
    }
})