const mongoose = require('mongoose')
const { userSchema, chatSchema } = require('./schema.js')

exports.User = mongoose.model('User',userSchema)
// exports.Friend = mongoose.model('Friend',friendSchema)
exports.Chats = mongoose.model('FriendChat',chatSchema)