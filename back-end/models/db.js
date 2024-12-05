const mongoose = require('mongoose')

const uri = 'mongodb://localhost:27017/chatDB'

async function connectChatDB () {
    try {
        await mongoose.connect(uri);
        console.log('chatDB connected.')
    } catch(err) {
        console.log('chatDB not connected',err)
    }
}

exports.chatDB = connectChatDB;