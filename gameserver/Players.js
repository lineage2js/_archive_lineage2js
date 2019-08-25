function Players() {
	this._players = [];
}

Players.prototype.addPlayer = function(player) {
	this._players.push(player);
}

Players.prototype.addBots = function(bots) {
	for(var i = 0; i < bots.length; i++) {
		this._players.push(bots[i]);
	}
}

Players.prototype.getPlayers = function() {
	return this._players;
}

Players.prototype.getOnlinePlayers = function() {
	
}


module.exports = Players;