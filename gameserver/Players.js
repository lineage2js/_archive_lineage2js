function Players() {
	this._players = [];
}

Players.prototype.addPlayer = function(player) {
	this._players.push(player);
}

Players.prototype.getPlayers = function() {
	return this._players;
}


module.exports = Players;