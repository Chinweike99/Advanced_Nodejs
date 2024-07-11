const express = require('express');
const http = require('http');
const socket = require('socket.io')

const app = express()
const server = http.createServer(app);

const PORT = 3000;

// Get static file
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send("HELLO")
})

server.listen(PORT, ()=> {
    console.log(`Listening to port ${PORT}`)
})