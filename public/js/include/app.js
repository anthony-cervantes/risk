var socket = io.connect('http://localhost');

document.addEventListener('DOMContentLoaded', function() {
	"use strict";

	console.log('Initialize...');

	socket.on('news', function (data) {
		console.log(data);
		socket.emit('my other event', { my: 'data' });
	});
});
