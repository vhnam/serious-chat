//Console
var express = require('express'),
    logger = require('morgan'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    exphbs = require('express-handlebars'),
	modules = require('./modules'),
    curSession = null;

var app = express();

// view engine setup
app.set('views', './views');
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

// set response status for development
app.use(logger('dev'));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));
// set virtual host
console.log(__dirname);
//app.use(modules.helper.createVirtualHost(express,'chat.local.com',path.join(__dirname, '../public')));


// to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({	extended: true }));

// to support session
app.use(session({
	resave: true,
	secret: '300743fc860c3699224630a9282adf954cf65858ba1131061b42ffcb4dfc110c',
	saveUninitialized: false
}));

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
		error: ('development' === app.get('env')) ? err : {},
		stylesheets: [
			'/components/angular-material/angular-material.min.css',
			'/css/error.css'
		],
		scripts: [
			'/components/angular/angular.min.js',
			'/components/angular-aria/angular-aria.js',
			'/components/angular-animate/angular-animate.js',
			'/components/angular-material/angular-material.js',
			'/js/error.js'
		]
	});
});

module.exports = app;
