var _io = function(http) {

  var io = require('socket.io')(http);

  io.on('connection', function(socket) {
    console.log('A user connected');

    socket.on('request', function(data) {
      io.emit('response', data);
    });
  });

  return io;
};

module.exports = _io;
