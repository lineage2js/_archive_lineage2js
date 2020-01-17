// writeC - 1 byte
// writeH - 2 byte
// writeD - 4 byte
// writeF - 8 byte
// writeS - string

class ServerPacket {
	constructor(size) {
		this._buffer = new Buffer.alloc(size + 4 + (size + 4) % 8); // (size + 4) % 8 - checksum. the packet is a multiple of 8.
		this._offset = 0;
	}

	writeC(value) {
		this._buffer.writeUInt8(value, this._offset);
		this._offset++;

		return this;
	}

	writeH(value) {
		this._buffer.writeUInt16LE(value, this._offset);
		this._offset += 2;

		return this;
	}

	writeD(value) {
		this._buffer.writeInt32LE(value, this._offset);
		this._offset += 4;

		return this;
	}

	writeF(value) {
	    this._buffer.writeDoubleLE(value, this._offset);
	    this._offset += 8;
	    
	    return this;
	}

	writeS(string) {
		this._buffer.write(string, this._offset, "ucs2");
		this._offset += Buffer.byteLength(string, "ucs2") + 2;
	    this._buffer.writeInt16LE(0, this._offset - 2);

	    return this;
	}

	getBuffer() {
	    return this._buffer;
	}

	static strlen(str) {
	    return Buffer.byteLength(str, "ucs2") + 2;
	}
}

module.exports = ServerPacket;