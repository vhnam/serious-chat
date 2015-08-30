var express = require('express'),
    Rusha = require('rusha'),
	md5 = require('blueimp-md5').md5,
	Sequelize = require('sequelize'),
	router = express.Router(),
	models = require('../models'),
	modules = require('../modules');

router.get('/', function (req, res, next) {
    curSession = req.session;
	if(req.session.uid) {
		models.User.findOne({
			where: {
				id: req.session.uid
			},
			attributes: ['nickname', 'avatar', 'email']
		}).then(function (user) {
			res.render('app/index', {
				'user': user,
				'stylesheets': [
					'/components/angular-material/angular-material.min.css',
					'/css/app/index.css'
				],
				'scripts': [
					'/components/jquery/dist/jquery.min.js',
					'/components/angular/angular.min.js',
					'/components/angular-aria/angular-aria.js',
					'/components/angular-animate/angular-animate.js',
					'/components/angular-material/angular-material.js',
					'components/socket.io-client/socket.io.js',
					'/js/app/index.js'
				]
			});
		});
	}else{
		res.redirect('/signin');
	}
	return;
});

router.get('/signout', function(req, res, next) {
	req.session.destroy(function(err) {
		if (err) {
			return next(err);
		}

		res.redirect('/');
	});
});

module.exports = router;
