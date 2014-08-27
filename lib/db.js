var mongoose = require('mongoose');
var logger = require(__dirname + '/logger');
var config = require('config');
var db = null;

mongoose.connect(config.get('db'));
db = mongoose.connection;

db.on('error', function (err) {
	logger.error("DB error:", err);
});

module.exports = mongoose;
