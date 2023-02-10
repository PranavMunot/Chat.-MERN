const Message = require('../Database/Model/MessageModel')

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

    // const foundMessages = await Message.find({ from: from, to: to }).sort({ createdAt: -1 }).limit(3).sort({ createdAt: 1 }).exec()
    const foundMessages = await Message.aggregate([
        { $match: { from: from, to: to } }
    ])

    res.status(200).json({
        success: true,
        foundMessages
    })
}