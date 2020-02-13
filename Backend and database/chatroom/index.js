const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});


let chatroom = null;
let arrayOfRoom = [];

io.on('connection', (socket)=>{
    console.log('A User has come into our server.');

    socket.on('subscribe', (room)=>{
        chatroom = room;
        socket.join(room);
        console.log(' a User has joined our room: ' + room);

        arrayOfRoom.push(room);
        console.log(arrayOfRoom);
    })

    socket.on('chatMessage', (msg)=>{
        console.log('message: ' + msg);

        io.to(chatroom).emit('chatMessage', msg);
    });

    socket.on('disconnect', ()=>{
        console.log('A user has abandoned us....');
    });
    socket.on('isTyping', function(data){
        socket.broadcast.to(chatroom).emit('isTyping', data)
        console.log(data);
        
    });


});

http.listen(3000);