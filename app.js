var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var pbi2 = require("./pbi/pbi2");
var pbi3 = require("./pbi/pbi3");
var pbi4 = require("./pbi/pbi4");
var pbi6 = require("./pbi/pbi6");
var ejs = require('ejs');

http.createServer(function(req, res) {
	
	if (req.method === "GET") {
		if (req.url === "/") {
			res.writeHead(200, {"Content-Type": "text/html"});
		    res.end(ejs.render(fs.readFileSync('./views/index.ejs', 'utf8'),{
				filename:"./views/index.ejs",
				page:'dashboard',
				title:"Node JS",
				subtitle:"Dashboard",
				image:"nodejs.svg",
				header:"Dashboard",
				subheader:"Node JS"
			})); 
		} else if (req.url === "/pbi2") {
			res.writeHead(200, {"Content-Type": "text/html"});
		    res.end(ejs.render(fs.readFileSync('./views/index.ejs', 'utf8'),{
				filename:"./views/index.ejs",
				page:'pbi2',
				title:"Node JS",
				subtitle:"PBI 2",
				image:"nodejs.svg",
				header:"PBI 2",
				subheader:"As a Software Engineer, I want to see a simple web server and making HTTP Request using NodeJS."
			}));
		} else if (req.url === "/pbi3") {
			res.writeHead(200, {"Content-Type": "text/html"});
		    res.end(ejs.render(fs.readFileSync('./views/index.ejs', 'utf8'),{
				filename:"./views/index.ejs",
				page:'pbi3',
				title:"Node JS",
				subtitle:"PBI 3",
				image:"nodejs.svg",
				header:"PBI 3",
				subheader:"As a Technical Reviewer, I want to see the NodeJS HTTP Module Serving JSON Data."
			}));
		} else if (req.url === "/pbi4") {
			res.writeHead(200, {"Content-Type": "text/html"});
		    res.end(ejs.render(fs.readFileSync('./views/index.ejs', 'utf8'),{
				filename:"./views/index.ejs",
				page:'pbi4',
				title:"Node JS",
				subtitle:"PBI 4",
				image:"nodejs.svg",
				header:"PBI 4",
				subheader:"As a Technical Reviewer, I want to see the NodeJS HTTP Module collecting post data."
			}));
		} else {
			fs.readFile('./assets'+req.url, function(err, data) {
		        if (!err) {
		            var dotoffset = req.url.lastIndexOf('.');
		            var mimetype = dotoffset == -1
		                            ? 'text/plain'
		                            : {
		                                '.html' : 'text/html',
		                                '.ico' : 'image/x-icon',
		                                '.jpg' : 'image/jpeg',
		                                '.png' : 'image/png',
		                                '.gif' : 'image/gif',
		                                '.svg' : 'image/svg+xml',
		                                '.css' : 'text/css',
		                                '.woff2' : 'font/opentype',
										'.woff' : 'font/opentype',
										'.ttf' : 'font/opentype', 
		                                '.js' : 'text/javascript'
		                                }[ req.url.substr(dotoffset) ];
		            res.setHeader('Content-type' , mimetype);
		            res.end(data);
		        } else {
		            console.log ('file not found: ' + req.url);
		            res.writeHead(404, "Not Found");
		            res.end();
		        }
		    });
		}
	} else if (req.method === "POST") {
		if (req.url === "/insertData") {
			pbi4.processData(function(query){
				pbi6.insertData(function(data){
					res.writeHead(200, {"Content-Type": "text/plain"});
		            res.end(JSON.stringify(data));
				},query);
			},req);
		} else if (req.url === "/getData") {
			pbi4.processData(function(query){
				query.form_filter=qs.parse(query.form_filter);
	            pbi3.getData(function(data){
					res.writeHead(200, {"Content-Type": "text/plain"});
		            res.end(JSON.stringify(data));
				},query);
			},req);
        } else if (req.url === "/requestData") {
        	pbi4.processData(function(query){
				pbi2.requestData(function(data){
					res.writeHead(200, {"Content-Type": "text/html"});
			        res.end(data);
				},query);
			},req);
		} else {
			res.writeHead(404, {"Content-Type": "text/plain"});
			res.end("Not found");
		}
	}
}).listen(3000);

/*---------------NON EXPRESS----------------*/

/*-----------------EXPRESS----------------*/
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {next();});
app.use(express.static("./assets"));
app.use(cors());

app.get("/", function(req, res) {
	res.render('index',{
		filename:"./views/index.ejs",
		page:'dashboard',
		title:"Express JS",
		subtitle:"Dashboard",
		image:"expressjs.png",
		header:"Dashboard",
		subheader:"Express JS"
	});
});

app.get("/pbi2", function(req, res) {
	res.render('index',{
		filename:"./views/index.ejs",
		page:'pbi2',
		title:"Express JS",
		subtitle:"PBI 2",
		image:"expressjs.png",
		header:"PBI 2",
		subheader:"As a Software Engineer, I want to see a simple web server and making HTTP Request using NodeJS."
	});
});

app.get("/pbi3", function(req, res) {
	res.render('index',{
		filename:"./views/index.ejs",
		page:'pbi3',
		title:"Express JS",
		subtitle:"PBI 3",
		image:"expressjs.png",
		header:"PBI 3",
		subheader:"As a Technical Reviewer, I want to see the NodeJS HTTP Module Serving JSON Data."
	});
});

app.get("/pbi4", function(req, res) {
	res.render('index',{
		filename:"./views/index.ejs",
		page:'pbi4',
		title:"Express JS",
		subtitle:"PBI 4",
		image:"expressjs.png",
		header:"PBI 4",
		subheader:"As a Technical Reviewer, I want to see the NodeJS HTTP Module collecting post data."
	});
});

app.get("/pbi6", function(req, res) {
	res.render('index',{
		filename:"./views/index.ejs",
		page:'pbi6',
		title:"Express JS",
		subtitle:"PBI 6",
		image:"expressjs.png",
		header:"PBI 6",
		subheader:"As a Software Engineer, I am able to create APIs using ExpressJS."
	});
});

app.post("/insertData", function(req, res) {
	pbi6.insertData(function(data){
		res.json(data);
	},req.body);
});

app.post("/getData", function(req, res) {
	req.body.form_filter=qs.parse(req.body.form_filter);
    pbi3.getData(function(data){
        res.json(data);
	},req.body);
});

app.post("/requestData", function(req, res) {
	pbi2.requestData(function(data){
		res.writeHead(200, {"Content-Type": "text/html"});
        res.end(data);
	},req.body);
});

app.get("/getDataTable", function(req, res) {
	req.query.form_filter=qs.parse(req.query.form_filter);
    pbi6.countData(function(count){
        pbi6.getData(function(data){
			res.json({
				"draw":req.query.draw,
				"recordsTotal":count,
				"recordsFiltered":data.rowCount,
				"data":data.data
			});
		},req.query);
	});
});

app.post("/deleteData", function(req, res) {
	pbi6.deleteData(function(data){
		res.json(data);
	},req.body);
});

app.listen(3400);

console.log("Node listening on port 3000");
console.log("Express listening on port 3400");
module.exports = app;


