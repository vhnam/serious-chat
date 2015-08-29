var express = require('express'),
    Rusha = require('rusha'),
	md5 = require('blueimp-md5').md5,
	Sequelize = require('sequelize'),
	router = express.Router(),
	//session = require('express-session'),
	models = require('../models');

router.get('/', function(req, res, next) {
	if (req.session.uid) {
		res.redirect('/app');
	}

	res.render('index', {
		'stylesheets': [
			'/components/angular-material/angular-material.min.css',
			'/css/index.css'
		],
		'scripts': [
			'/components/jquery/dist/jquery.min.js',
			'/components/angular/angular.min.js',
			'/components/angular-aria/angular-aria.js',
			'/components/angular-animate/angular-animate.js',
			'/components/angular-material/angular-material.js',
			'/js/index.js'
		]
	});
});

router.get('/signup', function(req, res, next) {
	res.render('signup', {
		'stylesheets': [
			'/components/angular-material/angular-material.min.css',
			'/css/signup.css'
		],
		'scripts': [
			'/components/angular/angular.min.js',
			'/components/angular-aria/angular-aria.js',
			'/components/angular-animate/angular-animate.js',
			'/components/angular-material/angular-material.js',
			'/components/rusha/rusha.min.js',
			'/components/blueimp-md5/js/md5.min.js',
			'/js/signup.js'
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
		nickname: 'Anonymous'
	}).then(function() {
		res.redirect('/signin');
	});
});

router.get('/signin', function(req, res, next) {
	res.render('signin', {
		'stylesheets': [
			'/components/angular-material/angular-material.min.css',
			'/css/signin.css'
		],
		'scripts': [
			'/components/angular/angular.min.js',
			'/components/angular-aria/angular-aria.js',
			'/components/angular-animate/angular-animate.js',
			'/components/angular-material/angular-material.js',
			'/components/rusha/rusha.min.js',
			'/components/blueimp-md5/js/md5.min.js',
			'/js/signin.js'
		]
	});
});

router.post('/signin', function(req, res, next) {
	var email = req.body.email,
		hash = req.body.hash,
		rusha = new Rusha();

	hash = rusha.digest('5h3h53ui4h5u' + hash + '34b42j3hb42jh');
	hash = md5('543bhjb53gf' + hash + '324kj234jh32kjh');

	models.User.findOne({
		where: {
			email: email,
			password: hash
		},
		attributes: ['id']
	}).then(function(user) {
		if (user === null) {
			res.redirect('/signin');
		} else {
			req.session.uid = user.dataValues.id;
			res.redirect('/app');
		}
	});
});

module.exports = router;
