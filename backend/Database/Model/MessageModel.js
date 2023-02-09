const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({

    from: { type: mongoose.Types.ObjectId, ref: 'User', required: [true, `"From" Id is Must`] },
    to: { type: mongoose.Types.ObjectId, ref: 'User', required: [true, `"To" Id is Must`] },
    messageType: {
        type: String,
        required: [true, `"Message type" is Must`]
    },
    message: {
        type: String,
        required: [true, `"Message" is Must`]
    }

})

module.exports = mongoose.model('message', messageSchema)