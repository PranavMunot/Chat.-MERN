// import Routers
const express = require('express')
const router = express.Router()

// import middleware
const { isLoggedIn } = require('../Middleware/userMiddlewares')

// import Controllers
const { login, signup, logout, sendFriendRequest } = require('../Controllers/UserController')

router.route('/login').post(login)
router.route('/logout').get(isLoggedIn, logout)
router.route('/signup').post(signup)
router.route('/sendRequest').post(isLoggedIn, sendFriendRequest)

module.exports = router