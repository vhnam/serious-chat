/**
 * List user of chat ROOM.
 * @type {{}}
 */
var users = [],
    models = require('../models');

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
        //console.log('A user connected');
        /**
         * Create unique id with email or string input
         * @param email
         * @returns {*}
         */
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
                io.sockets.emit('newUserConnect', {unique: getUnique(), nickname: user.nickname, avatar: user.avatar});
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
        socket.on('newLogin', function(user){
            addNewUser(this,user);
        });

        /**
         * Event on user is typing ---
         * data = {
         *  .unique id client
         *  .unique id user capture
         * }
         */
        socket.on('typing', function (data) {
            //Code logic here.
        });

        /**
         * Event on user en type ---
         *
         */
        socket.on('endType', function (data) {
            //Code logic here.
        });

        /**
         * Event for send message
         * data = {
         *  .unique group,
         *  .user: {
         *      .unique send,
         *      .nickname,
         *      .avatar,
         *  },
         *  .message
         * }
         */
        socket.on('sendMessage',function(data){
            console.log(data);
            //Code logic here.
            if(data.message && data.user.nickname){
                /*users.forEach(function(index, elemetn){
                    if(index != data.user.unique) {
                        console.log("New message: "+ data.message);
                        elemetn.emit('newMessage', data);
                    }
                });*/
                io.sockets.emit('newMessage', data);
            }
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


