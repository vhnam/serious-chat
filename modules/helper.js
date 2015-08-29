
var key = 'bZd5AybT<x1BsDfN4d-';

/**
 * Function return encode of string.
 * @param str
 * @returns {*}
 */
exports.enCodeUnique =  function (str) {
    return md5(str);
};

/**
 * Function return City name of ipAddress.
 * @param ipAddress
 */
exports.getCountry = function (ipAddress) {
    //Logic code get country from ipAddress.
};

/**
 * @param domainName
 * @param dirPath
 * @returns {*}
 */
exports.createVirtualHost = function (express, domainName, dirPath) {
    return require('vhost')(domainName, express.static(dirPath));
};


//module.exports = helper;
