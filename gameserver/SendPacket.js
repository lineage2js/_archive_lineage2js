function SendPacket(socket, players) {
	this.socket = socket;
	this.players = players;
}

SendPacket.prototype.send = function(packet, encoding = true) {
	var packetLength = new Buffer.from([0x00, 0x00]);
	packetLength.writeInt16LE(packet.length + 2);
	
	for(var i = 0; i < this.players.length; i++) {
		if(this.players[i].socket === this.socket) {
			if(encoding) {
				packet = new Buffer.from(this.players[i].xor.encrypt(packet));
				packet = Buffer.concat([packetLength, packet]);
				this.players[i].socket.write(packet);
			} else {
				packet = Buffer.concat([packetLength, packet]);
				this.players[i].socket.write(packet);
			}
		}
	}
	
}

SendPacket.prototype.broadcast = function(packet) {
	var packetLength = new Buffer.from([0x00, 0x00]);
	packetLength.writeInt16LE(packet.length + 2);

	for(var i = 0; i < this.players.length; i++) {
		if(this.players[i].socket !== this.socket) {
			packet = new Buffer.from(this.players[i].xor.encrypt(packet));
			packet = Buffer.concat([packetLength, packet]);
			this.players[i].socket.write(packet);
		}
	}
}

module.exports = SendPacket;