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
			data.password = require('../modules').helper.enCodeUnique(data.password);
			//data.nickname = 'Anonymous';
			return data;
		}
		return false;
	};
	return User;
};
