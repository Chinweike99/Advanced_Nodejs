const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser, userLeaves, getRoomUsers} = require('./utils/users')


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

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });

    })
    
    // Listen for chat message
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id)

        io.to(user.room).emit("message", formatMessage(`${user.username}`, msg))
    });

     // Runs when a user disconnects ## It has to be inside the connection
     socket.on('disconnect', () => {
        const user = userLeaves(socket.id);
        if(user){
            io.to(user.room).emit("message", formatMessage(botName,`${user.username} left`));

            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });

    // io.emit() // To all clients in general
})

// app.get('/', (req, res) => {
//     res.send("HELLO")
// })

server.listen(PORT, ()=> {
    console.log(`Listening to port ${PORT}`)
})