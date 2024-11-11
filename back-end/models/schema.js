const mongoose = require('mongoose')

exports.friendSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    contact: {
        type: String,
    }
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
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friend' }],
    }
})

