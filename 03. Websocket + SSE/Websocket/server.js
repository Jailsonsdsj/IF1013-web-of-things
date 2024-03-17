import { Server as WebSocketServer } from 'ws';
wss = new WebSocketServer({port: 8080, path: '/home'});
wss.on('connection', function(ws) {
    const messageData = ""
    ws.on('message', function(message) {
        console.log('Message received in server: %s ', message);
        messageData = message
    });
    console.log('new connection');
    ws.send('Message from server' + messageData);
});