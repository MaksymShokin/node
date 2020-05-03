//node core modules
// fs, http, https, path, os

// node app.js

const http = require('http');

const rqListener = (req, res) => {
  const url = req.url;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Submit</button></form></body>');
    res.write('<html>');
    return res.end()
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My first response</title></head>');
  res.write('<body><h1>Hello from node.js</h1></body>');
  res.write('<html>');
  res.end();
}

const server = http.createServer(rqListener)

server.listen(3000)
