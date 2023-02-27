// import Routers
const express = require('express')
const router = express.Router()

// import middleware
const { isLoggedIn } = require('../Middleware/userMiddlewares')

// import Controllers
const {
    login,
    signup,
    logout,
    sendFriendRequest,
    getRequests,
    getUser,
    acceptRequest,
    getMultipleUsersById,
    deleteFriend } = require('../Controllers/UserController')

router.route('/login').post(login)
router.route('/logout').get(isLoggedIn, logout)
router.route('/getUser').get(isLoggedIn, getUser)
router.route('/getMultipleUsersById').get(isLoggedIn, getMultipleUsersById)
router.route('/signup').post(signup)
router.route('/sendRequest').post(isLoggedIn, sendFriendRequest)
router.route('/getRequests').get(isLoggedIn, getRequests)
router.route('/acceptRequest').post(isLoggedIn, acceptRequest)
router.route('/deleteFriend').delete(isLoggedIn, deleteFriend)
// router.route('/getRecievedRequest').get(isLoggedIn, getRecievedRequest)

module.exports = router