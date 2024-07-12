const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser} = require('./utils/users')


const app = express()
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000;

// Get static file
app.use(express.static('public'));

const botName = "ChatBot";
// Run when a client is conected
io.on('connection', (socket) =>{
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        //Welcome Current User
        socket.emit('message', formatMessage(botName, "Welcome to ChatApp")); // Emit to single client

        // BroadCast when a user connects
        socket.broadcast.to(user.room).emit("message", formatMessage(botName, `${user.username} joined the chat`));// this emits to everyone except the user that is connecting
    })
    
    // Listen for chat message
    socket.on('chatMessage', msg => {
        io.emit("message", formatMessage('USER', msg))
    });

     // Runs when a user disconnects ## It has to be inside the connection
     socket.on('disconnect', () => {
        io.emit("message", formatMessage(botName,'A user left'));
    });

    // io.emit() // To all clients in general
})

// app.get('/', (req, res) => {
//     res.send("HELLO")
// })

server.listen(PORT, ()=> {
    console.log(`Listening to port ${PORT}`)
})