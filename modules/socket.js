/**
 * List user of chat ROOM.
 * @type {{}}
 */

var users = {};
var _io = function (http, app, port) {
    var io, server;
    if (!(app && port && http)) {
        io = require('socket.io')(http);
    } else {
        server = http.createServer(app);
        server.listen(process.env.WEBSITEPORT || process.env.PORT || port, function () {
            var address = server.address();
            console.log("opened server on %j", address);
        });
        io = require('socket.io').listen(server);
    }
    io.on('connection', function (socket) {
        var isNewUser = false;
        console.log('A user connected');
        //#start Declare function for socket ------------
        /**
         * Function add new user to list Users
         * @param socket
         * @param data
         */
        function addNewUser(socket, data){
            var uniqueName = require('helper').helper.enCodeUnique(data.username);
            if(!(data in users)){
                isNewUser = true;
                socket.username = data.username;
                socket.nickName = data.nickName;
                socket.avatar = data.avatar;
                users[uniqueName] = socket;
                io.sockets.emit('new user connect', {unique: uniqueName, nickName: data.nickName, avatar: data.avatar});
            }
        }


        /**
         * Function add new user to list chat
         * data = {
         *  .username,
         *  .avatar,
         *  .nickName
         * }
         */
        socket.on('add user', function(data){

        });
        
        socket.on('request', function (data) {
            io.emit('response', data);
        });
        
        socket.on('typing', function (data) {
            io.emit('response', data);
        });
        
        /**
         * Event for new message 
         * data = {
         *     .userName,
         *     .msg,
         * } 
         */
        socket.on('new message',function(data){
            
        });
        
    });

    return io;
};
module.exports = _io;


