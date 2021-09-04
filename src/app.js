const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const cache = {};

const send404 = (response) => {
  response.writeHead(404, { 'Content-Type': 'text/plain' });
  response.write('Error 404: resource not found.');
  response.end();
};

const sendFile = (response, filePath, fileContents) => {
  response.writeHead(200, {
    'Content-Type': mime.getType(path.basename(filePath)),
  });
  response.end(fileContents);
};

const serveStatic = (response, cache, absPath) => {
  if (cache[absPath]) {
    sendFile(response, absPath, cache[absPath]);
  } else {
    fs.chmodSync('public/index.html', fs.constants.S_IRUSR);
    fs.access(absPath, fs.constants.R_OK, (err) => {
      if (err) {
        console.error(err);
        send404(response);
      } else {
        fs.readFile(absPath, (err, data) => {
          if (err) {
            send404(response);
          } else {
            cache[absPath] = data;
            sendFile(response, absPath, data);
          }
        });
      }
    });
  }
};

const app = http.createServer((request, response) => {
  let filePath = false;

  if (request.url === '/') {
    filePath = 'public/index.html';
  } else {
    filePath = 'public'.concat(request.url);
  }

  const absPath = './'.concat(filePath);
  serveStatic(response, cache, absPath);
});

module.exports = app;
