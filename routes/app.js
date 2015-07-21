var express = require('express'),
	Rusha = require('rusha'),
	md5 = require('blueimp-md5').md5,
	Sequelize = require('sequelize'),
	router = express.Router(),
	models = require('../models');

router('/', function(req, res, next) {
	// TODO
});

router('/signin', function(req, res, next) {
	// TODO
});

module.exports = router;