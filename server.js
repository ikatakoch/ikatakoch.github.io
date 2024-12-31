const WebSocket = require('ws');
const express = require('express');
const { createServer } = require('http');

const app = express();

const server = createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('a user connected');

  ws.on('message', (message) => {
    console.log('received: %s', message);
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Server started');
});

module.exports = {
  handler: server,
};
