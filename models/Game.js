var db = require(__dirname + '/../lib/db');

var gameSchema = db.Schema({
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	},
	deleted_at: Date
});

var Game = db.model('Game', gameSchema);

module.exports = Game;
