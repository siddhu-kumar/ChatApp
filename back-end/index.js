const express = require('express')
const cookiParser = require('cookie-parser')
const { Server } = require('socket.io')
const cors = require('cors')
const { chatDB } = require('./models/db.js')
const { userRoute } = require('./routes/routes.js')
const app = express()

app.use (cookiParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:'http://127.0.0.1:3000',
    credentials: true,
}))



app.use('/', userRoute)

const expressServer = app.listen(8000,'127.0.0.1')
const io = new Server(expressServer, {
    cors: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
})

async function main() {
    await chatDB()
}


io.on('connection', (socket) => {
    console.log('new client connected', socket.id)
    socket.on('messageFromClientToServer', async (message, callback) => {

        console.log(message)
        try {
            socket.broadcast.timeout(5000).emit('messageFromServerToClient', message, (err, response) => {
                if (err) {
                    console.log(err)
                    callback({ status: err })
                } else {
                    console.log(response)
                    callback(response)
                }
            });
        } catch (err) {
            callback({ status: err })
            console.log(err)
        }
    })
    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id)
    })
})

main()