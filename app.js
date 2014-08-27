var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

var logger = require(__dirname + '/lib/logger');
var db = require(__dirname + '/lib/db');
var Game = require(__dirname + '/models/Game');

/**
 * Express
 */
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static('public'));

app.get('/', function (req, res){
	res.render(app.get('views') + '/index.jade', {
		pageTitle: "Risk"
	});
});

app.get('/new', function (req, res){
	Game.create({}, function(err, game) {
		if (err) {
			throw err;
		}

		logger.info("New game", game.id, "created.");

		res.redirect('/game/' + game.id);
	});
});

app.get('/game/:id', function (req, res){
	var game = Game.findOne({
		_id: req.params.id
	}).exec(function(err, game) {
		if (err) {
			throw err;
		} else if (!game) {
			logger.warn('Game could not be found', req.params.id);
			return;
		}

		console.log(game.id);
		res.send(game);
	});
});

/**
 * Socket.io
 */
io.on('connection', function (socket) {
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
app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
