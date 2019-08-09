function ServerPacket(size) {
	this._buffer = new Buffer.alloc(size + 4 + (size + 4) % 8); // (size + 4) % 8 - checksum. the packet is a multiple of 8.
	this._offset = 0;
}

// writeC - 1 byte
// writeH - 2 byte
// writeD - 4 byte
// writeF - 8 byte
// writeS - string

ServerPacket.prototype.writeC = function(value) {
	this._buffer.writeUInt8(value, this._offset);
	this._offset++;

	return this;
}

ServerPacket.prototype.writeH = function(value) {
	this._buffer.writeUInt16LE(value, this._offset);
	this._offset += 2;

	return this;
}

ServerPacket.prototype.writeD = function(value) {
	this._buffer.writeInt32LE(value, this._offset);
	this._offset += 4;

	return this;
}

ServerPacket.prototype.writeF = function(value) {
    this._buffer.writeDoubleLE(value, this._offset);
    this._offset += 8;
    
    return this;
};

ServerPacket.prototype.writeS = function(string) {
	this._buffer.write(string, this._offset, "ucs2");
	this._offset += Buffer.byteLength(string, "ucs2") + 2;
    this._buffer.writeInt16LE(0, this._offset - 2);

    return this;
};

ServerPacket.prototype.getBuffer = function() {
    return this._buffer;
};

module.exports = ServerPacket;