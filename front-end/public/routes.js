const express = require('express')

exports.routes = express.Router()
    .get('/', (_, res) => {
        res.sendFile(__dirname + '/index.html')
    })
    .get('/register', (_, res) => {
        res.sendFile(__dirname + '/register.html')
    })
    .get('/all-user',(req,res)=> {
        res.sendFile(__dirname + '/allUser.html')
    })