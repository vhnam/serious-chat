/**
 * Define module variable
 * @type {Rusha|exports|module.exports}
 */
var Rusha = require('rusha'),
    md5 = require('blueimp-md5').md5
/**
 * Define private variable
 * @type {string}
 */
var beginKey = 't?X(AjQ2&S%_)+lK-d6R';
var endKey = '3[YCWxQnF%Au/@~CwfWi';
/**
 * Function return encode of string.
 * @param str
 * @returns {*}
 */
exports.enCodeUnique =  function (str) {
    var rusha = new Rusha();
    //Decode string.
    str = rusha.digest(beginKey + str + endKey);
    return md5(endKey + str + beginKey);
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
