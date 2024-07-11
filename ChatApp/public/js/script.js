const chatForm =  document.getElementById('chat-form')

const socket = io();

// Message from server
socket.on('message', message=> {
    console.log(message)
    outputMesage(message);
})

// Submit message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get message text
    const msg = e.target.elements.msg.value;

    //Emit message to server
    socket.emit("chatMessage", msg);
})

// Output Message to DOM
function outputMesage(message){
    const div = document.createElement('div');
    div.classList.add("message");
    div.innerHTML = `<p class="meta">Jacob <span>7:00am</span></p>
                        <p class="text">
                            ${message}
                        </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}