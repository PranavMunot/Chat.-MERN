const Message = require('../Database/Model/MessageModel')
const mongoose = require('mongoose')

exports.sendMessage = async (req, res, next) => {
    const from = req.user._id
    const { to, messageType, message } = req.body

    if (!message || message.trim() === "") {
        return res.status(400).json({
            success: false,
            message: 'Message delivery fail: Invalid Message'
        })
    }

    const newMessage = await Message.create({
        from, ...req.body
    })

    res.status(200).json({
        success: true,
        newMessage
    })

}

exports.getMessages = async (req, res, next) => {
    const from = req.user._id
    const { to } = req.body

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
    { $limit: 15 },
    { $sort: { createdAt: 1 } },
    ])


    res.status(200).json({
        success: true,
        foundMessages
    })
}