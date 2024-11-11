const { User } = require('../models/models.js')

exports.registerUser = async (req, res) => {
    const { username, contact, password } = req.body;
    console.log(username,contact,password)
    const register = new User({ username: username, contact: contact, password: password })
    const saveRegister = await register.save()
    
    res.redirect('/all-user')
}

exports.allUser = async (req,res) => {
    const userList = []
    const allUser = await User.find();
    for(i=0;i<allUser.length;i++) {
        const {_id,username,contact} = allUser[i];
        userList.push({_id,username,contact})
    }
    res.status(200).json(userList);
}

exports.addFriend = async (req,res) => {
    const {id}=req.body;

    res.status(200)
}