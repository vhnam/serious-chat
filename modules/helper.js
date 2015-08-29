'use strict';

var helper = function(){
    var key = 'bZd5AybT<x1BsDfN4d-';
    /**
     * Function return encode of string.
     * @param str
     * @returns {*}
     */
    this.enCodeUnique = function(str){
        return md5(str);
    };

    /**
     * Function return City name of ipAddress.
     * @param ipAddress
     */
    this.getCountry = function(ipAddress){
        //Logic code get country from ipAddress.
    }
};

module.exports = helper;