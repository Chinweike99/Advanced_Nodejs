const express = require('express');
const http = require('http');
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000;

// Get static file
app.use(express.static('public'));

// Run when a client is conected
io.on('connection', (socket) =>{
    socket.emit('message', "Welcome to ChatApp"); // Emit to single client

    // BroadCast when a user connects
    socket.broadcast.emit("message", "A new user joined the chat");// this emits to everyone except the user that is connecting

    // Runs when a user disconnects ## It has to be inside the connection
    socket.on('disconnect', () => {
        io.emit("message",'A user left');
    });

    // Listen for chat message
    socket.on('chatMessage', msg => {
        io.emit("message", msg)
    });

    // io.emit() // To all clients in general
})

// app.get('/', (req, res) => {
//     res.send("HELLO")
// })

server.listen(PORT, ()=> {
    console.log(`Listening to port ${PORT}`)
})