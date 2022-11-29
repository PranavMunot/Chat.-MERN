const User = require('../Database/Model/UserModel')
const bcrypt = require('bcryptjs')

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User Not Found'
        })
    }

    const verifiedUser = await bcrypt.compare(password, user.password)
    if (!verifiedUser) {
        return res.status(400).json({
            success: false,
            message: 'Auth-Failed - pass error'
        })
    }

    const token = await user.createJWT()

    res.status(200).json({
        success: 'true',
        token,
        user
    })
}

exports.logout = async (req, res, next) => {
    return res.status(200).json({
        success: 'true',
        message: 'User logged out success fully!'
    })
}

exports.signup = async (req, res, next) => {
    // Take Required and Optional Inputs
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            errorMsg: 'Please enter proper name, Email, Password'
        })
    }

    // create unique 6-digit alpha-numeric code
    const chatCode = Math.random().toString(36).slice(2, 8);

    const user = await User.create({ name, email, password, chatCode })

    const token = await user.createJWT()

    user.password = undefined

    res.status(201).json({
        success: true,
        token,
        user
    })

    console.log('Hello')

}