// Load requirements
var http = require('http').createServer(function(req, res)
{
  // Send HTML headers and message
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.end('<h1>Aw, snap! 404</h1>');
});
var io = require('socket.io')(http);

// Create server & socket
var server = http
server.listen(8080);
io = io.listen(server);

// Add a connect listener
io.sockets.on('connection', function(socket)
{
  console.log('Client connected.');

  // Disconnect listener
  socket.on('disconnect', function() {
  console.log('Client disconnected.');
  });
});