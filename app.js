var socket = require('socket.io');
var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);
var io = socket.listen(server);
var path = require('path');
var config = require('config');

var logger = require(__dirname + '/lib/logger');
var db = require(__dirname + '/lib/db');
var Game = require(__dirname + '/models/Game');

/**
 * Express
 */
app.set('port', config.get('port'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static('public'));

/**
 * Routes
 */
app.get('/', function (req, res) {
	console.log(req.session);

	res.render(app.get('views') + '/index.jade', {
		pageTitle: "Risk"
	});
});

app.get('/new', function (req, res) {
	Game.create({}, function(err, game) {
		if (err) {
			throw err;
		}

		logger.info("New game", game.id, "created.");

		res.redirect('/game/' + game.id);
	});
});

app.get('/game/:id', function (req, res) {
	var game = Game.findOne({
		_id: req.params.id
	}).exec(function(err, game) {
		if (err) {
			throw err;
		} else if (!game) {
			logger.warn('Game could not be found', req.params.id);
			return;
		}

		res.send(game);
	});
});

/**
 * Socket.io
 */
io.on('connection', function (socket) {
	logger.debug("User connected to socket.io");

	socket.emit('news', {
		hello: 'world'
	});

	socket.on('my other event', function (data) {
		console.log(data);
	});
});

/**
 * Start webserver
 */
server.listen(app.get('port'), function() {
	logger.info('Server started and listening on port ' + app.get('port'));
});
