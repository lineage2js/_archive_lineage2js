let fs = require("fs");

class Html {
	constructor() {
		this._data = {};
	}

	addFiles(directory) {
		fs.readdir(directory, (err, fileNames) => {
			fileNames.forEach(fileName => {
	      		fs.readFile(`${directory}/${fileName}`, 'utf-8', (err, content) => {	
	        		this._add(fileName, content);
	      		})
	    	})
	  	})
	}

	get(fileName) {
		return this._data[fileName];
	}

	_add(fileName, content) {
		this._data[fileName.substring(0, fileName.indexOf('.'))] = content;
	}
}

module.exports = new Html();