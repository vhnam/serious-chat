module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		fullname: DataTypes.STRING
	});

	return User;
}