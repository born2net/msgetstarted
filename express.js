#!/usr/local/bin/node --harmony

// //////////////////////////////////////
//
// Node Secure Server (SSL)
//   switch modes via bash: dist ; dev
//
////////////////////////////////////////

var http = require('http');
var fs = require('fs');
var _ = require('underscore');

var globs = {};
globs.IPLISTEN = '127.0.0.1';
globs.PORT_LISTEN_DIST = 80;

var express = require('express');
var app = express();

app.use('/', express.static(__dirname));

app.use(express.bodyParser());
app.use(express.methodOverride());
// app.use(express.favicon('./public/assets/favicon.ico'));
app.use(express.compress());
app.use(app.router);

// var auth = require("msauth").create('ms');

var server = http.createServer(app).listen(80, globs.IPLISTEN);
