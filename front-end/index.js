const http = require('http')
const fs = require('node:fs')
const path = require('node:path')
const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/':
            serveFile(res, 'index.html')
            break;
        case '/all-user':
            serveFile(res, 'allUser.html')
            break;
        case '/register':
            serveFile(res, 'register.html')
            break;
        case '/style.css':
            serveStaticFile(res, 'style.css', 'text/css')
            break;
        case '/socket.js':
            serveStaticFile(res,'socket.js','text/javascript')
            break
        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain')
            res.end('<h1>Page not found</h1>')
    }
})

function serveFile(res, filename) {
    const filepath = path.join(__dirname, 'public', filename)
  
    fs.readFile(filepath, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/html')
            res.end('Error in loading file')
            return;
        }
        res.statusCode = 200
        res.setHeader = ('Content-Type', 'text/html')
        res.end(data)
    })
}

function serveStaticFile(res, filename, contentType) {
    var filepath;
    const ext = path.extname(filename)
    if(ext === '.js') {
        filepath = path.join(__dirname, 'public/js', filename);
        console.log(filepath)
    } 
    if(ext === '.css'){
        filepath = path.join(__dirname, 'public/style', filename)
        console.log(filepath)
    }
    fs.readFile(filepath, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Error loading the file');
            return;
        }

        res.statusCode = 200;
        res.setHeader = ('Content-Type', contentType);
        res.end(data);
    });
}

server.listen(3000)
