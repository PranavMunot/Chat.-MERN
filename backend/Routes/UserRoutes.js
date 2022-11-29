// import Routers
const express = require('express')
const router = express.Router()

// import Controllers
const { login, signup, logout } = require('../Controllers/UserController')

router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/signup').post(signup)

module.exports = router