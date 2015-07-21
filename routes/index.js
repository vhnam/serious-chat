var express = require('express'),
	Rusha = require('rusha'),
	md5 = require('blueimp-md5').md5,
	Sequelize = require('sequelize'),
	router = express.Router(),
	models = require('../models');

router.get('/', function(req, res, next) {
	res.render('index', {
		'stylesheets': [
			'components/angular-material/angular-material.min.css',
			'css/index.css'
		],
		'scripts': [
			'components/jquery/dist/jquery.min.js',
			'components/angular/angular.min.js',
			'components/angular-aria/angular-aria.js',
			'components/angular-animate/angular-animate.js',
			'components/angular-material/angular-material.js',
			'js/index.js'
		]
	});
});

router.get('/signup', function(req, res, next) {
	res.render('signup', {
		'stylesheets': [
			'components/angular-material/angular-material.min.css',
			'css/signup.css'
		],
		'scripts': [
			'components/angular/angular.min.js',
			'components/angular-aria/angular-aria.js',
			'components/angular-animate/angular-animate.js',
			'components/angular-material/angular-material.js',
			'components/rusha/rusha.min.js',
			'components/blueimp-md5/js/md5.min.js',
			'js/signup.js'
		]
	});
});

router.post('/signup', function(req, res, next) {
	var email = req.body.email,
		hash = req.body.hash,
		rusha = new Rusha();

	hash = rusha.digest('5h3h53ui4h5u' + hash + '34b42j3hb42jh');
	hash = md5('543bhjb53gf' + hash + '324kj234jh32kjh');

	models.User.create({
		email: email,
		password: hash,
		fullname: 'Anonymous'
	}).then(function() {
		res.redirect('/app');
	});
});

module.exports = router;
