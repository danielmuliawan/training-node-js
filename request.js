var https = require("https");
var fs = require("fs");
var data = process.argv.slice(2);

var options = {
	hostname: "maps.googleapis.com",
	port: 443,
	path: `/maps/api/geocode/json?address=${data[0]}&key=AIzaSyAzF4XusKuqjQjtnyIwU7WK4Vx3fMxA9_Y`,
	method: "GET"
};

var req = https.request(options, function(res) {

	var responseBody = "";

	console.log("Response from server started.");
	console.log(`Server status: ${res.statusCode} `);
	console.log("Response Headers: %j", res.headers);

	res.setEncoding("UTF-8");

	res.once("data", function(chunk) {
		console.log(chunk);
	});

	res.on("data", function(chunk) {
		console.log(`--chunk-- ${chunk.length}`);
		responseBody += chunk;
	});

	res.on("end", function() {
		fs.writeFile(`${data[0]}.html`, responseBody, function(err) {
			if(err) {
				throw err;
			}
			console.log("File Downloaded");
		});
	});

});

req.on("error", function() {
	console.log(`Problem with request: ${err.message}`);
});

req.end();