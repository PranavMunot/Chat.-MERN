const express = require('express')
const router = express.Router()

// import middleware
const { isLoggedIn } = require('../Middleware/userMiddlewares')

const { sendMessage, getMessages, getMessageById } = require('../Controllers/MessageController')

router.route('/sendMessage').post(isLoggedIn, sendMessage)
router.route('/getMessages').post(isLoggedIn, getMessages)
router.route('/getMessageById').post(isLoggedIn, getMessageById)


module.exports = router