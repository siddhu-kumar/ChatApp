const express = require('express')
const { Server } = require('socket.io')
const { join } = require('node:path')
const { chatDB } = require('./back-end/models/db.js')
const { userRoute } = require('./back-end/routes/routes.js')
const {routes} = require('./public/routes.js')
const app = express()

const expressServer = app.listen(3000)

app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));

app.use('/', userRoute)
app.use('/',routes)

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