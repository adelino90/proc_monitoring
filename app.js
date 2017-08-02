var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
 	
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

fs.readdirSync('./routes').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./routes/' + file);
      route.controller(app);
  }
});


var server = http.createServer(app).listen(3000, function() {
	console.log('App started on port ' + 3000);
});