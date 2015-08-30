var Rusha = require('rusha'),
	md5 = require('blueimp-md5').md5;

/**
 * Define Data table.
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}|Model}
 * @private
 */
module.exports = function (sequelize, DataTypes) {

	var User = sequelize.define('User', {
		email: DataTypes.STRING,
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		nickname: DataTypes.STRING,
		avatar: DataTypes.STRING
	});

	/**
	 * Process data user to compare ...
	 * @param data
	 * @returns {*}
	 */
	sequelize.processUser = function(data){
		if(data.email && data.password) {
			rusha = new Rusha();
			//Decode password.
			var hash = data.password;
			hash = rusha.digest('t?X(AjQ2&S%_)+lK-d6R' + hash + '3[YCWxQnF%Au/@~CwfWi');
			data.password = md5('9aSwkh,s%1/zkz<~#%)@' + hash + 'B6Xsr)&AFQ0R4njj-W/<');
			//data.nickname = 'Anonymous';
			return data;
		}
		return false;
	};
	return User;
};
