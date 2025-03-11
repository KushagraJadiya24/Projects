const express = require('express')
const path = require('path')
const app = express()
const PORT = 4000

const server = app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
});


const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname,"public"))); //it serves the html file with the default name index.html

let socketsConected = new Set()

io.on('connection',onConnected);

function onConnected(socket) {

    console.log(socket.id)
    socketsConected.add(socket.id);

    io.emit('clients-total',socketsConected.size);

    socket.on('disconnect',()=>{
        console.log("disconnected",socket.id)
        socketsConected.delete(socket.id);

        io.emit('clients-total',socketsConected.size);
    })


    socket.on('message',(data)=>{
        console.log(data);
        socket.broadcast.emit('chat-message',data)
    })
}