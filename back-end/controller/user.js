const { User } = require('../models/models.js')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
    const { username, contact, password } = req.body;
    console.log(req.body)
    const register = new User({ username: username, contact: contact, password: password })
    const saveRegister = await register.save()
    const token = await jwt.sign({ userId: register._id }, 'hello-chat', { expiresIn: '24h' })
    res.status(201).json(token)
}

exports.allUser = async (req, res) => {
    const userList = []
    const allUser = await User.find();
    for (i = 0; i < allUser.length; i++) {
        const { _id, username, contact } = allUser[i];
        userList.push({ _id, username, contact })
    }
    res.status(200).json(userList);
}

exports.addFriend = async (req, res) => {
    console.log('hello frnd')
    const { id } = req.body;
    console.log(req.userId)
    res.status(200)
}