function ServerPacket(size) {
	this._buffer = new Buffer.allocUnsafe(size + 2);
	this._offset = 2;
}

// writeC - 1 byte
// writeH - 2 byte
// writeD - 4 byte
// writeF - 8 byte

ServerPacket.prototype.writeC = function(value) {
	this._buffer.writeInt8(value, this._offset);
	this._offset++;

	return this;
}

ServerPacket.prototype.writeH = function(value) {
	this._buffer.writeInt16LE(value, this._offset);
	this._offset += 2;

	return this;
}

ServerPacket.prototype.writeD = function(value) {
	this._buffer.writeInt32LE(value, this._offset);
	this._offset += 4;

	return this;
}

module.exports = ServerPacket;