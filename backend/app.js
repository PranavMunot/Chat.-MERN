const express = require('express')
const fileUpload = require('express-fileupload')
const morgan = require("morgan")
const cookieParser = require('cookie-parser')
const userRoute = require('./Routes/UserRoutes')
const messageRoute = require('./Routes/MessageRoutes')
const cors = require('cors')
const cloudinary = require('cloudinary').v2
const app = express()

// express middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))
// all third-party middlewares
app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))

// cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})
// Routes
app.use('/api/v1', userRoute)
app.use('/api/v1/messages', messageRoute)

module.exports = app