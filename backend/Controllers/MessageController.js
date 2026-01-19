const Message = require('../Database/Model/MessageModel')
const User = require('../Database/Model/UserModel')
const mongoose = require('mongoose')

exports.sendMessage = async (req, res, next) => {
    const from = req.user
    const { to, messageType, message } = req.body

    if (!message || message.trim() === "") {
        return res.status(400).json({
            success: false,
            message: 'Message sending fail: Invalid Message'
        })
    }
    const isUserFriend = await User.find({ _id: from.id, friendList: { $in: [to] } }).lean().count() > 0

    if (isUserFriend) {
        const newMessage = await Message.create({
            from: from._id, ...req.body
        })

        res.status(200).json({
            success: true,
            newMessage
        })
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Message Sending Fail: You are not friend!'
        })
    }

}

exports.getMessages = async (req, res, next) => {
    const from = req.user._id
    const { to, limit } = req.body, defaultMessageLimit = 15;
    console.log(limit)

    const foundMessages = await Message.aggregate([{
        $match: {
            $or: [{
                from: new mongoose.Types.ObjectId(from),
                to: new mongoose.Types.ObjectId(to)
            }, {
                from: new mongoose.Types.ObjectId(to),
                to: new mongoose.Types.ObjectId(from)
            }]
        }
    },
    { $sort: { createdAt: -1 } },
    { $limit: limit ? limit : defaultMessageLimit },
    { $sort: { createdAt: 1 } },
    ])


    res.status(200).json({
        success: true,
        foundMessages
    })
}

exports.getMessageById = async (req, res) => {
    // TODO: get messageid and return message
    const { msgId } = req.body;

    if (!msgId) return res.status(400).send({
        success: false,
        message: 'No Message id available!'
    });
    try {
        const message = await Message.findById(msgId).exec()
        console.log(message)
        if (!message) return res.status(200).send({
            success: true,
            data: null,
        });
        return res.status(200).send({
            success: true,
            data: message,
        });
    } catch (e) {
        throw new Error(`Error getting message ${e}`)
    }
}