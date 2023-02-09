const express = require('express')
const router = express.Router()

// import middleware
const { isLoggedIn } = require('../Middleware/userMiddlewares')

const { sendMessage, getMessages } = require('../Controllers/MessageController')

router.route('/sendMessage').post(isLoggedIn, sendMessage)
router.route('/getMessages').get(isLoggedIn, getMessages)


module.exports = router