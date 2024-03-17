const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Client connected!');

  setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 100);
    ws.send(JSON.stringify({ voltagem: randomNumber }));
  }, 1000);

  ws.on('close', function close() {
    console.log('Client connected!');
  });
});

console.log('WebSocket server running at port: 8080');
