'use strict';
var helper = require('helper'),
    socket = require('socket'),
    port = 1508,
    http = require('http');
module.exports.socket = createSocket(http,port,module.app);

//-------------------------------------------------------
function createSocket(http,port,app){
    return new socket(http,port,app);
}
