var mongoose = require('mongoose');
var logger = require(__dirname + '/logger');
var config = require('config');
var db = null;

mongoose.connect(config.get('db'), {
	server: {
		socketOptions: {
			keepAlive: 1
		}
	},
	replset: {
		socketOptions: {
			keepAlive: 1
		}
	}
});
mongoose.set('debug', config.get('debug'));
db = mongoose.connection;

db.on('error', function (err) {
	if (!err) {
		return;
	}

	logger.error('DB Error:', err.toString());
});

module.exports = mongoose;
