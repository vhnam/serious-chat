var express = require('express'),
    Rusha = require('rusha'),
	md5 = require('blueimp-md5').md5,
	Sequelize = require('sequelize'),
	router = express.Router(),
	session = require('express-session'),
	models = require('../models'),
	curSession;

router.get('/', function(req, res, next) {
	if (req.session.uid) {
		res.redirect('/app');
		return;
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
	var user = models.sequelize.processUser(req.body);
	if(user) {
		user.nickname = 'Anonymous';
		models.User.create(user).then(function () {
			res.redirect('/signin');
		});
	}
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
	var data = models.sequelize.processUser(req.body);
	if(data) {
		models.User.findOne({
			where: data,
			attributes: ['id']
		}).then(function (user) {
			if (user === null) {
				res.redirect('/signin');
			} else {
				req.session.uid = user.dataValues.id;
				res.redirect('/app');
			}
		});
	}else{
		res.redirect('/signin');
	}
});

module.exports = router;
