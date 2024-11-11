const mongoose = require('mongoose')
const { userSchema, friendSchema } = require('./schema.js')

exports.User = mongoose.model('User',userSchema)
exports.Friend = mongoose.model('Friend',friendSchema)