class XOR {
	constructor(key) {
		this.decryptKey = new Buffer.from(key);
		this.encryptKey = new Buffer.from(key);
	}

	decrypt(data) {
		let temp = 0;
		let count = 0;
			  
		for (let i = 0; i < data.length; ++i) {
			if(count == 8) count = 0;
			    
			let temp2 = data[i] & 0xff;
			data[i] = (temp2 ^ (this.decryptKey[count]) ^ temp);
			temp = temp2;
			count++;
		}

		let old = this.decryptKey[0] & 0xff;
		old |= this.decryptKey[1] << 8 & 0xff00;
		old |= this.decryptKey[2] << 0x10 & 0xff0000;
		old |= this.decryptKey[3] << 0x18 & 0xff000000;
			
		old += data.length;
			
		this.decryptKey[0] = (old & 0xff);
		this.decryptKey[1] = (old >> 0x08 & 0xff);
		this.decryptKey[2] = (old >> 0x10 & 0xff);
		this.decryptKey[3] = (old >> 0x18 & 0xff);
		
		return data;
	}

	encrypt(data) {
		let temp = 0;
		let count = 0;
			  
		for (let i = 0; i < data.length; ++i) {
			if(count == 8) count = 0;
			    
			let temp2 = data[i] & 0xff;
			data[i] = (temp2 ^ (this.encryptKey[count]) ^ temp);
			temp = data[i];
			count++;
		}

		let old = this.encryptKey[0] & 0xff;
		old |= this.encryptKey[1] << 8 & 0xff00;
		old |= this.encryptKey[2] << 0x10 & 0xff0000;
		old |= this.encryptKey[3] << 0x18 & 0xff000000;
			
		old += data.length;
			
		this.encryptKey[0] = (old & 0xff);
		this.encryptKey[1] = (old >> 0x08 & 0xff);
		this.encryptKey[2] = (old >> 0x10 & 0xff);
		this.encryptKey[3] = (old >> 0x18 & 0xff);

		return data;
	}
}

module.exports = XOR;