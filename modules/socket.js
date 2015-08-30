/**
 * List user of chat ROOM.
 * @type {{}}
 */
var users = [];
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
        var isNewUser = false, uniqueName;
        console.log('A user connected');
        function getUnique(email){
            if(email){
                uniqueName = require('./helper').enCodeUnique(email);
            }
            return uniqueName;
        }
        //#start Declare function for socket ------------
        /**
         * Function add new user to list Users
         * @param socket
         * @param user
         */
        function addNewUser(socket, user){
            var findUsers = users.filter(function(us){
                if(us.email === user.email)
                    return true;
                return false;
            });
            if(!findUsers.length){
                isNewUser = true;
                socket.email = user.email;
                socket.nickname = user.nickname;
                socket.avatar = user.avatar;
                users[getUnique(user.email)] = socket;
                io.sockets.emit('new user connect', {unique: getUnique(), nickname: user.nickname, avatar: user.avatar});
            }else{
                //User connect again.......
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
        socket.on('new login', function(user){
            addNewUser(this,user.data);
        });


        socket.on('typing', function (data) {
            //io.emit('response', data);
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

        socket.on('disconnect', function () {
            if(isNewUser){
                if(!socket.email) return;
                delete users[uniqueName];
            }
        });
    });

    return io;
};
module.exports = _io;


