function Player() {
	this.socket = null;
	this.xor = null;
	this.online = false;
	this.login = null;
	this.characterSlot = null;
	this.isSitting = null;
	this.target = null;
	this.heading = null;
	this.waitType = 1;
	this.moveType = 1;
	this.positions = {
		x: null,
		y: null,
		z: null
	}
}

Player.prototype.getWaitType = function() {
	return this.waitType;
}

Player.prototype.setWaitType = function(waitType) {
	return this.waitType = waitType;
}

Player.prototype.getMoveType = function() {
	return this.moveType;
}

Player.prototype.setMoveType = function(moveType) {
	return this.moveType = moveType;
}

Player.prototype.saveState = function() {
	return this._player[key];
}

Player.prototype._checkPointInCircle = function(x1, y1, x2, y2, radius) {
	var dx = x2 - x1;
	var dy = y2 - y1;
	var sqrtDist = dx*dx + dy*dy;
	var sqrtRadius = radius*radius;

	return sqrtDist < sqrtRadius;
}

Player.prototype.getVisiblePlayers = function(players, handler) {
	var radius = 2000;

	for(var i = 0; i < players.length; i++) {
		if(players[i].socket !== this.socket) {
			if(players[i].online && this._checkPointInCircle(this.positions.x, this.positions.y, players[i].positions.x, players[i].positions.y, radius)) {
				handler(players[i]);
			}
		}
	}
}

module.exports = Player;