/**
 * Routing config
 *
 * @param  {Object} app 	Express module
 */
var router = function(app) {
	app.use('/', require('./index'));
}

module.exports = router;