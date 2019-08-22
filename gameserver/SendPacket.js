function SendPacket(player, players) {
	this._player = player;
	this._players = players;
}

SendPacket.prototype.send = function(packet, encoding = false /* for test */) {
	var packetLength = new Buffer.from([0x00, 0x00]);
	var packetCopy = new Buffer.from(packet);
	
	packetLength.writeInt16LE(packet.length + 2);
	
	if(encoding) {
		var packetEncrypted = new Buffer.from(this._player.xor.encrypt(packetCopy));

		packetEncrypted = Buffer.concat([packetLength, packetEncrypted]);
		this._player.socket.write(packetEncrypted);
	} else {
		packet = Buffer.concat([packetLength, packet]);
		this._player.socket.write(packet);
	}
}

SendPacket.prototype.broadcast = function(packet) {
	var packetLength = new Buffer.from([0x00, 0x00]);

	packetLength.writeInt16LE(packet.length + 2);

	for(var i = 0; i < this._players.length; i++) {
		if(this._players[i].online && this._players[i].socket !== this._player.socket) {
			var packetCopy = new Buffer.from(packet);
			var packetEncrypted = new Buffer.from(this._players[i].xor.encrypt(packetCopy));

			packetEncrypted = Buffer.concat([packetLength, packetEncrypted]);
			this._players[i].socket.write(packetEncrypted);
		}
	}
}

module.exports = SendPacket;