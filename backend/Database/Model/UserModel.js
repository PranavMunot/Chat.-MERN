const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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
        select: false,
        min: [6, 'Short Password'],

    },
    chatCode: {
        type: 'string',
        required: [true, 'Password is Must'],
        maxLength: 6,
        unique: true
    },
    profilePhoto: {
        id: {
            type: 'string'
        },
        secure_url: {
            type: 'string'
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },

    noOfFriends: {
        type: Number,
        default: 0
    },
    friendList: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    recievedRequests: [{ type: mongoose.Types.ObjectId, ref: 'User', required: true }],
    sentRequests: [{ type: mongoose.Types.ObjectId, ref: 'User', required: true }],
    inGroups: [{ type: mongoose.Types.ObjectId, ref: 'Group' }],
    notifications: [{ type: String }]

})

// encrypt pass before Saving states in DB
userSchema.pre('save', async function (next) {
    // whenever any other data is updated except password, move on to other task
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// Validate Password
userSchema.methods.validateUserPassword = async function (passwordByUser) {
    return await bcrypt.compare(this.password, passwordByUser)
}

// create JWT
userSchema.methods.createJWT = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET_CODE,
        { expiresIn: process.env.JWT_EXPIRY }
    )
}


module.exports = mongoose.model('User', userSchema)