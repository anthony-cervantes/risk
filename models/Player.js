var db = require(__dirname + '/../lib/db');

var playerSchema = db.Schema({
	session_id: String,
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

var Player = db.model('Player', playerSchema);

module.exports = Player;
