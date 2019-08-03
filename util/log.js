var fs = require("fs");

function log(text) {
	var path = "./log.txt";

 	fs.appendFile(path, text + "\n", err => {
	  if (err) throw err;
	});

	console.log(text);
}

module.exports = log;