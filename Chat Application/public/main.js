const socket =io();

const clientTotal = document.getElementById("clients-total");
const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

socket.on('clients-total',(data)=>{
    clientTotal.innerText = `Total Clients: ${data}`;
});

messageForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    sendMessage();
});

function sendMessage(){
    console.log(messageInput.value);
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date()
    }
    socket.emit('message', data);
    messageInput.value='';
    addMessageToUI(true,data);
    scrollToBottom();
}

socket.on('chat-message',(data)=>{
    addMessageToUI(false,data);
    scrollToBottom();
})

function addMessageToUI(isOwnMessage,data){

    const element = `<li class="${isOwnMessage ? "message-right": "message-left"}">
                     <p class="message"> ${data.message}
                     <span>${data.name} ${moment(data.dateTime).fromNow()}</span></p>
                     </li>`
    
    messageContainer.innerHTML += element;
}

function scrollToBottom(){
    messageContainer.scrollTo(0,messageContainer.scrollHeight);
}