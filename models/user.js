module.exports = function (sequelize, DataTypes) {

	var User = sequelize.define('User', {
		email: DataTypes.STRING,
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		nickName: DataTypes.STRING,
		avatar: DataTypes.STRING
	});

	return User;
};