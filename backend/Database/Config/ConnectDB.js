const mongoose = require('mongoose')


const ConnectDB = async () => {
    await mongoose.connect(`${process.env.DB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true }).then(
        console.log('Connection Established with MongoDB!')
    ).catch(error => {
        console.log(`Error:${error}`)
        process.exit(1)
    })
}


module.exports = ConnectDB