const express = require('express');
const socket = require('socket.io');


// App Setup
const app = express();
// const server = app.listen(4000, function(){
//     console.log('Listening to requests on port 4000');
// });

app.set( 'port', ( process.env.PORT || 5000 ));

// Start node server
var server  = app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
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