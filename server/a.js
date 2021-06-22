console.log('1');
// Connect to server
var io = require('socket.io-client');
const socket = io.connect('http://localhost:30001', {reconnect: true});

console.log('2');

// Add a connect listener
socket.on('connect', function(socket) { 
  console.log('Connected!');
});

socket.emit('init',{session_id:1,agents:[1,2,3]})


console.log('3');