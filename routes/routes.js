/**
 * Routing config
 *
 * @param  {Object} app 	Express module
 */
var router = function(app) {
	app.use('/', require('./index'));
	app.use('/app', require('./app'));
};

module.exports = router;