var http = require('http');
var url = require('url');
var querystring = require('querystring');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var bd_url = 'mongodb://db:27017/container_db';
var results = new Array();

var insertDocument = function(db, firstName, lastName, callback) {
	db.collection('users').insertOne( {
		"firstName" : firstName,
		"lastName" : lastName,
	}, function(err, result) {
		assert.equal(err, null);
		console.log("Inserted "+firstName+" into the users collection.");
		callback();
	});
};

var findUsers = function(db, callback) {
	results = new Array();
	var cursor = db.collection('users').find();
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			results.push(doc);
		} else {
			callback();
		}
	});
};

MongoClient.connect(bd_url, function(err, db) {
	assert.equal(null, err);
	findUsers(db, function() {
		db.close();
	});
});

var server = http.createServer(function(req, res) {
	var page = url.parse(req.url).pathname;
	var params = querystring.parse(url.parse(req.url).query);
	var firstName;
	var lastName;
	var name = '';

	MongoClient.connect(bd_url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected correctly to server.");
		findUsers(db, function() {
			db.close();
		});
	});

	if ('firstName' in params && 'lastName' in params) {
		firstName = params['firstName'];
		lastName = params['lastName'];
		name = firstName + ' ' + lastName + ' '; 
	}
	var para = '';
	for (i = 0; i < results.length; i++) {
		para += '<p>'+results[i].firstName +' '+results[i].lastName+'</p>';
	}
	res.writeHead(200, {"Content-Type": "text/html"});
	if (page == '/') {
		res.write('<!DOCTYPE html>'+
'<html>'+
'	<head>'+
'		<meta charset="utf-8" />'+
'		<title>test docker + node</title>'+
'	</head>'+ 
'	<body>'+
'	 	<p>Welcome '+name+'!</p>'+
'		<br/>'+
'		<h3>Last users</h3>'+
'		<div>'+para+'</div>'+
'	</body>'+
'</html>');
	}
	else {
		res.write('404 \n NOT FOUND');
	}
	if ('firstName' in params && 'lastName' in params) {
		MongoClient.connect(bd_url, function(err, db) {
			assert.equal(null, err);
			insertDocument(db, firstName, lastName, function() {
				db.close();
			});
		});
	}

	res.end();
});

server.listen(8080); // Démarre le serveur
