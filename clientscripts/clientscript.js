'use strict';
const socket = io();

window.addEventListener('load', ()=> {
    document.querySelector('.btn-primary').addEventListener('click', buttonClick);
});

function buttonClick(evt) {
    socket.emit('command','click');
}

socket.on('banan', function(data) {
    //Ändra bkg-färg
    let body = document.querySelector('body');
    body.setAttribute('style', 'background-color: rgb(' + data.red + ',' + data.green + ',' + data.blue + ');');
    let h5 = document.querySelector('h5');
    h5.textContent = 'Knappen är klickad ' + data.antal + ' antal gånger';

});