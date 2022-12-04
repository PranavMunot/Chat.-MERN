const User = require('../Database/Model/UserModel')
const jwt = require('jsonwebtoken')
const errorMessage = require('../Utils/errorMessage')

exports.isLoggedIn = async (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization')?.split(' ')[1] || req.body.token

    if (!token) {
        return errorMessage(res, 400, 'Please Log in to access the application!')
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_CODE)

    req.user = await User.findById(decode.id)

    next()
}
