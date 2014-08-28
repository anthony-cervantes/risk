var winston = require('winston');

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new winston.transports.File({
			filename: __dirname + '/../log/app.log',
			handleExceptions: true,
			json: true
		})
	],
	exitOnError: false
});

module.exports = logger;
