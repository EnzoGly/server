const http = require('http');
const https = require('https');

const hostname = '0.0.0.0';
const port = 80;

function getPublicIp(callback) {
    https.get('https://api.ipify.org?format=json', (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            callback(JSON.parse(data).ip);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

const server = http.createServer((req, res) => {
    console.log('New connection from:', req.socket.remoteAddress);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Server is up and running\n');
});

server.listen(port, hostname, () => {
    getPublicIp((publicIp) => {
        console.log(`Server running at http://${publicIp}:${port}/`);
    });
});
