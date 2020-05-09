let fs = require("fs");

function log(text) {
	let path = "./log.txt";

 	fs.appendFile(path, text + "\n", err => {
	  if (err) throw err;
	});

	console.log(text);
}

module.exports = log;