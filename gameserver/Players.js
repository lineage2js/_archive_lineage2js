function Players() {
	this._players = [];
}

Players.prototype.getAllPlayers = function() {
	return this._players;
}

Players.prototype.getActivePlayer = function(socket) {
	for(var i = 0; i < this._players.length; i++) {
		if(this._players[i].socket === socket) {
			return this._players[i];
		}
	}
}

Players.prototype.addPlayer = function(player) {
	this._players.push(player);
}

module.exports = Players;