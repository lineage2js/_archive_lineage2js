function Player() {
	this.socket = null;
	this.xor = null;
	this.online = false;
	this.login = null;
	this.characterSlot = null;
	this.positions = {
		x: null,
		y: null,
		z: null
	}
}

// Player.prototype.save = function(key) {
// 	return this._player[key];
// }

module.exports = Player;