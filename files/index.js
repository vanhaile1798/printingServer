var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
const {spawn} = require('child_process');

http.createServer((req, res) => {
	if (req.url === "/printfile") {
		var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {
			console.log(files.filetoprint);
			var oldPath = files.filetoprint.path;
			var newPath = '/home/mint/Downloads/printFile/files/' + files.filetoprint.name;
			fs.copyFileSync(oldPath, newPath, (err) => {
				if (err) throw err;
				return res.end('Uploaded and moved to files folder');
			});
			/*(function(test, callback) {
				spawn('lp', ['-o', 'media=A4', newPath]);
				callback();	
			})(1, function() {
				console.log('Printing');
			});*/
			
		});
	}
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<form action="printfile" method="post" enctype="multipart/form-data">');
	res.write('<input type="file" name="filetoprint"><br/>');
	res.write('<button type="submit">Print</button>');
	return res.end();
}).listen(8080, () => {
	console.log('Server is listening on port 8080');
});