const User = require('../Database/Model/UserModel')
const bcrypt = require('bcryptjs')
const cloudinary = require('cloudinary').v2
const getCookieToken = require('../Utils/Cookies')
const errorMessage = require('../Utils/errorMessage')

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        return errorMessage(res, 400, 'User Not Found!')
    }
    const verifiedUser = await bcrypt.compare(password, user.password)
    if (!verifiedUser) {
        return errorMessage(res, 400, 'User Name/ Password entered is wrong. Please try again!')
    }
    getCookieToken(user, res)

}

exports.logout = async (req, res, next) => {

    console.log('hello')

    // res.cookie('token', null, {
    //     expires: new Date(Date.now()), httpOnly: true
    // })

    console.log('here')

    return res.status(200).json({
        success: 'true',
        message: 'User logged out success fully!'
    })
}

exports.signup = async (req, res, next) => {
    // Take Required and Optional Inputs
    const { name, email, password } = req.body;

    const file = req.files.profilePhoto

    let profileImage;

    if (file) {
        profileImage = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'Chat Users',
            width: 100,
            height: 100,
            crop: 'scale'
        })
    } else {
        profileImage = undefined
    }

    req.body.profilePhoto = { id: profileImage.public_id, secure_url: profileImage.secure_url }

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            errorMsg: 'Please enter proper name, Email, Password'
        })
    }

    // create unique 6-digit alpha-numeric code
    req.body.chatCode = Math.random().toString(36).slice(2, 8);

    const user = await User.create(req.body)

    const token = await user.createJWT()

    user.password = undefined

    res.status(201).json({
        success: true,
        token,
        user
    })

    console.log('Hello')

}

exports.sendFriendRequest = async (req, res, next) => {
    const { chatCode } = req.body

    const user = await User.findById(req.user.id)

    // check chatcode if same -> return error
    if (chatCode === user.chatCode) {
        return errorMessage(res, 401, 'Cannot send request to same user!')
    }

    const requestedUser = await User.findOne({ chatCode })

    if (!requestedUser) {
        return errorMessage(res, 400, 'Cannot find your friend in Chat.')
    }

    user.sentRequests.push(requestedUser.id)
    requestedUser.recievedRequests.push(user.id)

    await user.save()
    await requestedUser.save()

    res.status(200).json({
        success: true,
        message: 'Request sent!'
    })
}