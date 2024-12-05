const mongoose = require('mongoose')

// exports.friendSchema = new mongoose.Schema({
//     username: {
//         type: String,
//     },
//     contact: {
//         type: String,
//     }
// })

exports.chatSchema = new mongoose.Schema({
    owner1: {
        type: String

    },
    owner2: {
        type: String
    },
    chat: [{
        message: { String },
        owner: { String },
        time: { Date }
    }]
})

exports.userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    friends: {
        type: [{type: mongoose.Schema.Types.ObjectId}]
    },
    friendsChat: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FriendChat' }]
    }
})

