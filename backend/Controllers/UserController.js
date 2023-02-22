const User = require('../Database/Model/UserModel')
const bcrypt = require('bcryptjs')
const cloudinary = require('cloudinary').v2
const getCookieToken = require('../Utils/Cookies')
const errorMessage = require('../Utils/errorMessage')


exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password)
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

    res.cookie('token', null, {
        expires: new Date(Date.now()), httpOnly: true
    })

    return res.status(200).json({
        success: 'true',
        message: 'User logged out success fully!'
    })
}

exports.signup = async (req, res, next) => {
    // Take Required and Optional Inputs
    const { name, email, password } = req.body;

    const file = req.files && req.files.profilePhoto

    console.log(name, email, password, file)

    let profileImage;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            errorMsg: 'Please enter proper name, Email, Password'
        })
    }

    if (file) {
        profileImage = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'Chat Users',
            width: 100,
            height: 100,
            crop: 'scale'
        })
    } else {
        profileImage = {
            "public_id": "Chat Users/pnewk3qaomps5cpwqp2h",
            "secure_url": "https://res.cloudinary.com/cloudinaryapplication/image/upload/v1677056444/Chat%20Users/pnewk3qaomps5cpwqp2h.png"
        }
    }

    req.body.profilePhoto = { id: profileImage.public_id, secure_url: profileImage.secure_url }



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
}

exports.getUser = async (req, res, next) => {
    const user = req.user
    if (!user) {
        return res.status(403).json({
            success: false,
            message: 'No user Found'
        })
    }

    return res.status(200).json({
        success: true,
        user
    })
}

exports.getMultipleUsersById = async (req, res, next) => {
    const user = req.user
    if (!user) {
        return res.status(403).json({
            success: false,
            message: 'No user Found'
        })
    }


    const response = await User.find({
        '_id': { $in: user.friendList }
    }).select(['_id', 'name', 'chatCode', 'profilePhoto', 'createdAt']).lean()


    return res.status(200).json({
        success: true,
        data: response
    })
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

    // check if user has already requested for same user or already a friend

    const userData = await Promise.all([
        User.find({ _id: user.id, friendList: { $in: [requestedUser.id] } }).count(),
        User.find({ _id: user.id, sentRequests: { $in: [requestedUser.id] } }).count(),
        User.find({ _id: user.id, recievedRequests: { $in: [requestedUser.id] } }).count(),
    ])

    if ((userData[0] + userData[1] + userData[2]) > 0) {
        return errorMessage(res, 401, 'User already your friend or requested the friend')
    }

    const requestPush = await Promise.all([
        user.sentRequests.push(requestedUser.id)
        , requestedUser.recievedRequests.push(user.id)])

    const updatedUserList = await Promise.all([user.save(), requestedUser.save()])

    requestPush && updatedUserList ? res.status(200).json({
        success: true,
        message: 'Request sent!'
    }) : res.status(400).json({
        success: false,
        message: 'Error sending request!'
    })

}

exports.getRequests = async (req, res, next) => {
    const [sentList, recievedList] = await [req.user.sentRequests, req.user.recievedRequests]

    const [sent, recieved] = await Promise.all(
        [User.find({ _id: { $in: sentList } })
            .select(['name', 'chatCode'])
            .lean()
            ,
        User.find({ _id: { $in: recievedList } })
            .select(['name', 'chatCode'])
            .lean()
        ])

    // console.log(sent, recieved)

    res.status(200).json({
        success: true,
        sent, recieved
    })
}

exports.acceptRequest = async (req, res, next) => {
    const { chatCode, acceptStatus } = req.body

    // find user with chatCode
    const [user, recieverUser] = await Promise.all([User.findById(req.user.id), User.findOne({ chatCode })])

    if ((!user || !recieverUser) || (user.chatCode === recieverUser.chatCode)) return res.status(400).json({ success: false, message: 'Operation Failed! User Chat Code Error.' })

    if (acceptStatus) {

        // inc no of friends
        user.noOfFriends += 1
        recieverUser.noOfFriends += 1

        // add both friend list
        await User.updateOne({ _id: user._id }, { $push: { friendList: [recieverUser.id] } })
        await User.updateOne({ _id: recieverUser._id }, { $push: { friendList: [user.id] } })

        // remove from req as well as sent list
        await User.updateOne({ _id: user.id }, { $pullAll: { recievedRequests: [recieverUser._id] } })
        await User.updateOne({ _id: recieverUser.id }, { $pullAll: { sentRequests: [user._id] } })

        const [sent, recieved] = await Promise.all([user.save(), recieverUser.save()])


        if (sent && recieved) {
            req.app.get('socket').emitToSenderRequest('get_user_after_accept', { user: recieverUser })
            req.app.get('socket').emitToRecieverRequest('get_user_after_accept', { user })
            // socket.to(effectedUser).emit('get_user_after_accept', { user: recieverUser })
        }

    } else {

        await User.updateOne({ _id: user.id }, { $pullAll: { recievedRequests: [recieverUser._id] } })
        await User.updateOne({ _id: recieverUser.id }, { $pullAll: { sentRequests: [user._id] } })

        await Promise.all([user.save(), recieverUser.save()])


    }



    res.status(200).json({
        success: true,
        message: `You ${acceptStatus ? 'accepted' : 'rejected'} ${recieverUser.chatCode}'s request`
    })


}

