const { User, Chats } = require('../models/models.js')
const jwt = require('jsonwebtoken')

exports.chatMessage = async (req,res) => {
    const userId = req.userId;
    const {message, _id, date} = req.body;
    const messageHistory = await Chats.find({owner1: userId, owner2: _id}).exec()

}

exports.registerUser = async (req, res) => {
    const { username, contact, password } = req.body;
    const register = new User({ username: username, contact: contact, password: password })
    const saveRegister = await register.save()
    const token = await jwt.sign({ userId: saveRegister._id }, 'hello-chat', { expiresIn: '10d' })
    res.status(201).json(token)
}

exports.loginUser = async (req, res) => {
    const { username, contact, password } = req.body;
    const user = await User.findOne({ password: password });
    console.log(user)
    const token = await jwt.sign({ userId: user._id }, 'hello-chat', { expiresIn: '10d' })
    console.log(token)

    res.cookie('login','successful')
    res.status(201).json(token);
}

exports.allUser = async (req, res) => {
    const userList = []
    const allUser = await User.find();
    for (i = 0; i < allUser.length; i++) {
        const { _id, username, contact } = allUser[i];

        if (_id.toString() === req.userId) {
            continue;
        }
        userList.push({ _id, username, contact })
    }
    res.cookie('all-users','availabe')
    res.status(200).json(userList);
}

exports.addFriend = async (req, res) => {
    const { id } = req.body;
    const getUser = await User.findById(req.userId)
    getUser.friends.push(id)
    await getUser.save()
    res.status(200)
}

exports.showFriend = async (req,res) => {
    const user = await User.findById({_id:req.userId})
    const friendArray = user.friends
    var friendArrayObject = []
    for(const data of friendArray ) {
        const {_id, username, contact} = await User.findById({_id:data})
        friendArrayObject.push({_id, username, contact})
    }
    res.status(200).json(friendArrayObject)
}