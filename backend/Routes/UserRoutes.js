// import Routers
const express = require('express')
const router = express.Router()

// import Controllers
const { login } = require('../Controllers/UserController')

router.route('/login').post(login)

module.exports = router