function SendPacket(blowfish, socket) {
	this.blowfish = blowfish;
	this.socket = socket;
}

SendPacket.prototype.send = function(packet, encoding = true) {
	var packetLength = new Buffer.from([0x00, 0x00]);
	packetLength.writeInt16LE(packet.length + 2);

	if(encoding) {
		packet = new Buffer.from(this.blowfish.encrypt(packet));
		packet = Buffer.concat([packetLength, packet]);
		this.socket.write(packet);
	} else {
		packet = Buffer.concat([packetLength, packet]);
		this.socket.write(packet);
	}
}

module.exports = SendPacket;