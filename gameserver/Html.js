let fs = require("fs");

class Html {
	constructor(dirname) {
		this._dirname = dirname;
		this._storage = {}
		this._init();
	}

	get(fileName) {
		return this._storage[fileName];
	}

	_readFiles(dirname, callback) {
		fs.readdir(dirname, (err, fileNames) => {
			fileNames.forEach(fileName => {
	      		fs.readFile(`${dirname}/${fileName}`, 'utf-8', (err, content) => {	
	        		callback(fileName, content);
	      		})
	    	})
	  	})
	}

	_add(fileName, content) {
		this._storage[fileName.substring(0, fileName.indexOf('.'))] = content;
	}

	_init() {
		this._readFiles(this._dirname, (fileName, content) => {
			this._add(fileName, content);
		});
	}
}

module.exports = Html;