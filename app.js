var express = require('express'),
	logger = require('morgan'),
	path = require('path'),
	bodyParser = require('body-parser'),
	exphbs = require('express-handlebars');

var app = express();

// view engine setup
app.set('views', './views');
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

// set response status for development
app.use(logger('dev'));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({	extended: true }));

// routing setup
require('./routes/routes')(app);

/**
 * Catch 404 and forward to error handler
 *
 * @param  {Object}   err  	Error
 * @param  {Object}   req  	Request
 * @param  {Object}   res  	Response
 * @param  {Function} next 	A way of calling the next middleware in the flow.
 */
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/**
 * Error handlers
 * Development error handler will print stacktrace
 * production error handler no stacktraces leaked to user
 *
 * @param  {Object}   err  	Error
 * @param  {Object}   req  	Request
 * @param  {Object}   res  	Response
 * @param  {Function} next 	A way of calling the next middleware in the flow.
 */
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: (app.get('env') === 'development') ? err : {},
		stylesheets: [
			'components/angular-material/angular-material.min.css',
			'css/error.css'
		],
		scripts: [
			'components/angular/angular.min.js',
			'components/angular-aria/angular-aria.js',
			'components/angular-animate/angular-animate.js',
			'components/angular-material/angular-material.js',
			'js/error.js'
		]
	});
});

module.exports = app;
