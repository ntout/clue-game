function generate_board () {
    for (let i = 0; i < 25; i++) {
        $('#board').append('<tr id="row'+i+'" class="row">'+i+' </tr>');
    }
}

function fill_row(row){
    for (let i = 0; i < 24; i++) {
        $(row).append('<td class="box"></td>')

    }
}

generate_board();
for (let i = 0; i < 25; i++){
    fill_row("#row"+i);
}

let boxes = $('#board .box');
let n = 0;
for(let i=0; i < boxes.length; i++){
    $(boxes[i]).attr('id', 'row'+n+'col' + i%24);
    if (i%24 === 23){
        n+=1;
    }
}
//
// $('#btn-dice').on('click', function(){
//     console.log('roll clicked');
//     $('#number').text((Math.floor(Math.random() * 6) + 1))
// });

