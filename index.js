const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  const { id } = socket;
  console.log('User connected is: ', id);

  try {
    setInterval(() => {
      const y = Math.floor(Math.random() * 2);
      const x = new Date();

      socket.emit('change', { x, y });
    }, 1000);
  } catch (error) {
    console.log(error);
  }
});

server.listen(3001, () => {
  console.log('SERVER IS RUNNING ON PORT 3001');
});
