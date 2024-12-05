const jwt = require('jsonwebtoken')

exports.middleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        console.log('Unauthrized access!')
        res.status(401).json({ 'Error': 'Unauthrized access!' })
        return;
    }
    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, 'hello-chat')
        req.userId = decoded.userId
        next()
    } catch (err) {
        console.log('Invalid token')
        res.status(401).json({ error: 'Invalid token!' })
    }
}

exports.tokenValidate = (req, res) => {
    console.log('ppppp')
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        console.log('Unauthrized access!')
        res.status(401).json({ 'Error': 'Unauthrized access!' })
        return;
    }
    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, 'hello-chat')
        req.userId = decoded.userId
        res.cookie('user', 'JohnDoe',{
            maxAge: 3600000,
            httpOnly: false, // You can make this false to access in JS
            secure: false, // Make sure you're using HTTPS
            sameSite: 'None', // Necessary for cross-origin requests
            path: '/'
          });
        
        // Send a response
        res.status(200).json({cookie:'sent'})
    } catch (err) {
        console.log('Invalid token')
        res.status(401).json({ error: 'Invalid token!' })
    }
}