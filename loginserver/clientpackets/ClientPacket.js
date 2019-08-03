function ClientPacket(buffer) {
	this._buffer = buffer;
	this._data = [];
	this._offset = 0;
}

// readC - 1 byte
// readH - 2 byte
// readD - 4 byte
// readF - 8 byte
// readB - string

ClientPacket.prototype.readC = function() {
	this._data.push(
        this._buffer.readInt8(this._offset)
    );
    this._offset++;

    return this;
}

ClientPacket.prototype.readH = function() {
	this._data.push(
        this._buffer.readInt16LE(this._offset)
    );
    this._offset += 2;

    return this;
}

ClientPacket.prototype.readD = function() {
    this._data.push(
        this._buffer.readInt32LE(this._offset)
    );
    this._offset += 4;

    return this;
};

ClientPacket.prototype.readF = function() {
	this._data.push(
    	this._buffer.readDoubleLE(this._offset)
    );
    this._offset += 8;

    return this;
}

ClientPacket.prototype.readB = function(length) {
    this._data.push(
        this._buffer.slice(this._offset, this._offset + length)
    );
    this._offset += length;

    return this;
}

module.exports = ClientPacket;