var express = require('express'),
	Rusha = require('rusha'),
	md5 = require('blueimp-md5').md5,
	Sequelize = require('sequelize'),
	router = express.Router(),
	models = require('../models');

router.get('/', function(req, res, next) {
	res.render('app/index', {
		'stylesheets': [
			'components/angular-material/angular-material.min.css',
			'css/app/index.css'
		],
		'scripts': [
			'components/jquery/dist/jquery.min.js',
			'components/angular/angular.min.js',
			'components/angular-aria/angular-aria.js',
			'components/angular-animate/angular-animate.js',
			'components/angular-material/angular-material.js',
			'js/app/index.js'
		]
	});
});

module.exports = router;
