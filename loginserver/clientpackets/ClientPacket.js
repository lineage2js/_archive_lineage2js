// readC - 1 byte
// readH - 2 byte
// readD - 4 byte
// readF - 8 byte
// readB - string
// readS - string

class ClientPacket {
    constructor(buffer) {
    	this._buffer = buffer;
    	this._data = [];
    	this._offset = 0;
    }

    readC() {
        this._data.push(
            this._buffer.readUInt8(this._offset)
        );
        this._offset++;

        return this;
    }

    readH() {
        this._data.push(
            this._buffer.readUInt16LE(this._offset)
        );
        this._offset += 2;

        return this;
    }

    readD() {
        this._data.push(
            this._buffer.readInt32LE(this._offset)
        );
        this._offset += 4;

        return this;
    }

    readF() {
        this._data.push(
            this._buffer.readDoubleLE(this._offset)
        );
        this._offset += 8;

        return this;
    }

    readB(length) {
        this._data.push(
            this._buffer.slice(this._offset, this._offset + length)
        );
        this._offset += length;

        return this;
    }

    readS() {
        let i;
        
        for (i = this._offset; i < this._buffer.length; i += 2) {
            if (this._buffer.readUInt16LE(i) === 0x00) {
                break;
            }
        }

        this._data.push(
            this._buffer.toString("ucs2", this._offset, i)
        );
        this._offset += i + 1;

        return this;
    }

    getData() {
        return this._data;
    }

}

module.exports = ClientPacket;