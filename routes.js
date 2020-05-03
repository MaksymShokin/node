//node core modules
// fs, http, https, path, os

const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Submit</button></form></body>');
    res.write('<html>');
    return res.end()
  }

  if (url === '/message' && method === 'POST') {
    const body = [];

    req.on('data', chunk => {
      body.push(chunk)
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        // redirection
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end()
      });
    });
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My first response</title></head>');
  res.write('<body><h1>Hello from node.js</h1></body>');
  res.write('<html>');
  res.end();
}

module.exports = requestHandler

/*
exporting multiple
module.exports = {
  handler: requestHandler,
  otherHandler: otherHandler
}

another way
exports.handler = requestHandler
 */

