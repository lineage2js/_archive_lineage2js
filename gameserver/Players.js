class Players {
	constructor(server) {
		this._players = [];
		this._server = server;
	}

	addPlayer(player) {
		this._players.push(player);
		this._server.objects.add(player);
	}

	addBots(bots) {
		for(var i = 0; i < bots.length; i++) {
			this._players.push(bots[i]);
			this._server.objects.add(bots[i]);
		}
	}

	getPlayers() {
		return this._players;
	}

	getOnlinePlayers() {
		
	}
}

module.exports = Players;