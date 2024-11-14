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

        if(_id.toString() === req.userId) {
            continue;
        }
        userList.push({ _id, username, contact })
    }
    res.status(200).json(userList);
}

exports.addFriend = async (req, res) => {
    const { id } = req.body;
    const getUser = await User.findById(req.userId)
    getUser.friends.push(id)
    await getUser.save()
    res.status(200)
}