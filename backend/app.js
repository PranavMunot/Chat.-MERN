const express = require('express')
const morgan = require("morgan")
const cookieParser = require('cookie-parser')
const userRoute = require('./Routes/UserRoutes')
const cors = require('cors')
const app = express()

// express middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// all third-party middlewares
app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))

// Routes
app.use('/api/v1', userRoute)

module.exports = app