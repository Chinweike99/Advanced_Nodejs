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
    console.log("New connection");

    socket.emit('message', "Welcome to ChatApp");

    // BroadCast when a user connects
    socket.broadcast.emit();// this emits to everyone except the user that is connecting
})

// app.get('/', (req, res) => {
//     res.send("HELLO")
// })

server.listen(PORT, ()=> {
    console.log(`Listening to port ${PORT}`)
})