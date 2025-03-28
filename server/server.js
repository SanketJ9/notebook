require('dotenv').config();
const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const io = new Server(server, {
    cors: {
        origin: FRONTEND_URL,
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('get-document', (documentId) => {
        const data = '';
        socket.join(documentId);
        socket.emit('load-document', data);

        socket.on('send-changes', (delta) => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        });
    });
});

app.get('/', (req, res) => {
    res.send('Socket.IO server is running');
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
