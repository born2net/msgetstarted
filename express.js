#!/usr/local/bin/node --harmony

// //////////////////////////////////////
//
// Node Secure Server (SSL)
//   localhost:8080/src/msgetstarted.html
//
////////////////////////////////////////

console.log('Enter enterprise user name:');
console.log('Enter password:');

var http = require('http');
var opn = require('opn');

var globs = {};
globs.IPLISTEN = '127.0.0.1';
globs.PORT_LISTEN_DIST = 8080;

var express = require('express');
var app = express();

var express = require('express');
var app = express();
app.use('/src', express.static(__dirname));
app.listen(globs.PORT_LISTEN_DIST, function () {
    console.log('Now open your browser to  http://localhost:8080/src/msgetstarted.html');
});
opn('http://localhost:8080/src/msgetstarted.html');
