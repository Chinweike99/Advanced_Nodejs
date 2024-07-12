const chatForm =  document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages');
const roomName =  document.getElementById('room-name');
const userList =  document.getElementById('users');

// GET Username and Room from URL
const  { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

const socket = io();

// Join chat Rooom
socket.emit('joinRoom', {username, room});

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

// Message from server
socket.on('message', message=> {
    console.log(message)
    outputMesage(message);

    // Scroll Down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

// Submit message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get message text
    const msg = e.target.elements.msg.value;

    //Emit message to server
    socket.emit("chatMessage", msg);

    // Clear message input
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
})

// Output Message to DOM
function outputMesage(message){
    const div = document.createElement('div');
    div.classList.add("message");
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
                        <p class="text">
                            ${message.text}
                        </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// Funtion to add room name to DOM
function outputRoomName(room){
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users){
    userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join()}`;
}