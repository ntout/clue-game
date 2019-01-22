var express = require('express');
var socket = require('socket.io');


// App Setup
var app = express();
var server = app.listen('tatortout.pythonanywhere.com', function(){
    console.log('Listening to requests on port 4000');
});


// Static Files
app.use(express.static('public'));


// Socket Setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection', socket.id);

    //Handle chat event
    socket.on('chat', function(data){
       io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

    //Handle character event
    socket.on('person', function(data){
        io.sockets.emit('person', data);
    });

    socket.on('spot', function(data){
        io.sockets.emit('spot', data);
    });
});