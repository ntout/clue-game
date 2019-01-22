// Make Connection
var socket = io.connect('http://localhost:4000');

//Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');
var char_btn = document.getElementById('character-submit');
var character = document.getElementById('character');


// Emit Events
btn.addEventListener('click', function(){
   socket.emit('chat', {
       message: message.value,
       handle: handle.value
   });
});

message.addEventListener('keyup', function(){
    socket.emit('typing', handle.value);
});


char_btn.addEventListener('click', function(){
   socket.emit('person', {
       character: character.value,
       handle: handle.value
   });
});


$('td').on('click', function(){
    socket.emit('spot', {
        player: character.value,
        element: $(this).attr('id')
    })
});



// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>'
});

socket.on('person', function(data){
    console.log(data);

    let users = $('.char');
    for (let i = 0; i < users.length; ++i){
        console.log(users[i].innerText);

        if (users[i].innerText === data.handle ){
            users[i].innerText = "";
        }
    }
    let span = document.getElementById(data.character + '-user');
    span.innerText = data.handle;

});

socket.on('spot', function(data){
    console.log(data);
    let box = document.getElementById(data.element);
    let boxes = document.getElementsByClassName(data.player);
    console.log(boxes.length);
    if(boxes.length > 0) {
        for (let i = 0; i < boxes.length; ++i) {
            boxes[i].className = "box"
        }
    }
    box.className = data.player

});

