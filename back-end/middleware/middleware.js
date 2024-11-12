const jwt = require('jsonwebtoken')

exports.middleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log(`header ${authHeader}`)
    if (!authHeader) {
        console.log('Unauthrized access!')
        res.status(401).json({ 'Error': 'Unauthrized access!' })
        return;
    }
    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, 'hello-chat')
        req.useId = decoded.useId
        console.log('miidleware next')
        next()
    } catch (err) {
        console.log('Invalid token')
        res.status(401).json({ error: 'Invalid token!' })
    }
}