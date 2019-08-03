function ClientPacket(buffer) {
	this._buffer = buffer;
	this._data = [];
	this._offset = 0;
}