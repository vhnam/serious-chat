var express = require('express'),
	router = express.Router();

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
			'js/signup.js'
		]
	});
});

module.exports = router;
