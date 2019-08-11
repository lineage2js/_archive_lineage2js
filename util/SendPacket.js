function SendPacket(encryptionEngine, socket, sockets) {
	this.encryptionEngine = encryptionEngine;
	this.socket = socket;
	this.sockets = sockets;
}

SendPacket.prototype.send = function(packet, encoding = true) {
	var packetLength = new Buffer.from([0x00, 0x00]);
	packetLength.writeInt16LE(packet.length + 2);

	if(encoding) {
		packet = new Buffer.from(this.encryptionEngine.encrypt(packet));
		packet = Buffer.concat([packetLength, packet]);
		this.socket.write(packet);
	} else {
		packet = Buffer.concat([packetLength, packet]);
		this.socket.write(packet);
	}
}
// fix
SendPacket.prototype.broadcast = function(packet) {
	var packetLength = new Buffer.from([0x00, 0x00]);
	packetLength.writeInt16LE(packet.length + 2);

	for(var i = 0; i < this.sockets.length; i++) {
		packet = new Buffer.from(this.encryptionEngine.encrypt(packet));
		packet = Buffer.concat([packetLength, packet]);
		this.sockets[i].write(packet);
	}
}

module.exports = SendPacket;