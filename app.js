var express = require('express'),
	logger = require('morgan'),
	path = require('path'),
	exphbs = require('express-handlebars');

var app = express();

// view engine setup
app.set('views', './views');
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// routing setup
require('./routes/routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
if (app.get('env') === 'development') {
	// development error handler will print stacktrace
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
} else {
	// production error handler no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
}

module.exports = app;
