const http = require('http')
const fs = require('node:fs')
const path = require('node:path')

function protectedRouteHandle(req,res, handleRoute) {
    if(true) {
        console.log(req.headers.cookie)
        handleRoute(req,res) 
    }
}

const server = http.createServer(function (req, res) {
    console.log(req.url)
    if (req.url === '/') {
        protectedRouteHandle(req,res,()=> {
            console.log('running')
            const filepath = path.join(__dirname, 'public/html', 'index.html')
            serveFile(res, filepath)
        })
    } else if (req.url === '/all-user') {
        const filepath = path.join(__dirname, 'public/html', 'allUser.html')
        serveFile(res, filepath)
    } else if (req.url === '/register') {
        const filepath = path.join(__dirname, 'public/html', 'register.html')
        serveFile(res, filepath)
    } else if (req.url === '/login') {
        const filepath = path.join(__dirname, 'public/html', 'login.html')
        serveFile(res, filepath)
    } else if (req.url === '/otp-verify') {
        const filepath = path.join(__dirname, 'public/html', 'otp.html')
        serveFile(res, filepath)
    } else {
        serveStaticFile(res, req.url)
    }
})

function serveStaticFile(res, filedirectory) {
    var filepath
    if (filedirectory.endsWith('.css')) {
        filepath = path.join(__dirname, 'public/style/', filedirectory)
    }
    if (filedirectory.endsWith('.js')) {
        filepath = path.join(__dirname, 'public/js/', filedirectory)
    }
    if (filedirectory.endsWith('.ico')) {
        filepath = path.join(__dirname, filedirectory)
    }
    const contenttype = contentType(filedirectory)
    fs.readFile(filepath, (err, data) => {
        if (err) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/plain')
            res.end('Unsupported request')
            return;
        }
        res.statusCode = 200
        res.setHeader('Content-Type', contenttype)
        res.end(data)
    })
}

function serveFile(res, filepath) {
    fs.readFile(filepath, (err, data) => {
        if (err) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/plain')
            res.end('Unsupported request')
            return;
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end(data)
    })
}

function contentType(filedirectory) {
    if (filedirectory.endsWith('.js'))
        return 'application/javascript'
    else if (filedirectory.endsWith('.css'))
        return 'text/css'
    else
        return 'text/plain'
}
server.listen(3000, '127.0.0.1')