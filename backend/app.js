const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const redis = require('redis');

const host = 'localhost';
const port = 8000;

// Erstellen des Servers

const app = express();
const httpServer = http.createServer(app);
const redisClient = redis.createClient();

app.use(express.json());

// Einbindung des Web-Socket-Servers 

const wsServer = new WebSocket.Server({ server: httpServer });

wsServer.on('connection', (socket) => {
    console.log('WebSocket client connected');

    socket.on('message', async(data) => {
        const message = data.toString();
        console.log('Received message from client:', message);
        wsServer.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              console.log('Sending message to client:', message);
                client.send(message);
            }
        });
    });

    socket.on('close', () => {
        console.log('WebSocket client disconnected');
    });
});

// Grundsätzliche Funktion des Servers
// und Kommunikation mit der Redis-Datenbank

app.get('/', (req, res)=>{
    res.send('Hello world');
});

app.post('/add-todo', async(req, res)=>{
    console.log(req.body);
    await redisClient.set('todos', JSON.stringify(req.body));
    res.send('Hello world');
});

app.get('/todos', async (req, res)=> {
    const todos= await redisClient.get('todos');
    res.send(JSON.parse(todos));
});

httpServer.listen(port, ()=> {
    console.log(`Server is running at http://${host}:${port}`);
});
