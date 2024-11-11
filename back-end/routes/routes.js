const express = require('express')
const { registerUser, allUser, addFriend } = require('../controller/user.js')

exports.userRoute = express.Router()
    .post('/register', registerUser)
    .get('/all-users', allUser)
    .post('/add-friend', express.json(),addFriend)