const express = require('express')
const fileUpload = require('express-fileupload')
const morgan = require("morgan")
const cookieParser = require('cookie-parser')
const cors = require('cors')
const cloudinary = require('cloudinary').v2;

const userRoute = require('./Routes/UserRoutes')
const messageRoute = require('./Routes/MessageRoutes')

const app = express()

// express middlewares
// parse data
app.use(express.json({}))
app.use(express.urlencoded({ extended: true }))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 50 * 1024 * 1024 },
}))
// all third-party middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,

}))
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


// error handling middleware
app.use((err, req, res, next) => {
    console.error(`${err} Error Handling`)
    res.status(500).json({ message: 'Error Occured in application' })
})


module.exports = app