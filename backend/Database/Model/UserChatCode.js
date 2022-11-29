const mongoose = require('mongoose')

const chatCodeSchema = mongoose.Schema({
    userChatCodeList: [{ type: mongoose.Types.ObjectId, required: true }]
})

module.exports = mongoose.model('chatCode', chatCodeSchema)