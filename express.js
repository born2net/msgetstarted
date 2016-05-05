#!/usr/local/bin/node --harmony

// //////////////////////////////////////
//
// Node Secure Server (SSL)
//   localhost:8080/src/msgetstarted.html
//
////////////////////////////////////////

var http = require('http');
var fs = require('fs');
// var _ = require('underscore');

var globs = {};
globs.IPLISTEN = '127.0.0.1';
globs.PORT_LISTEN_DIST = 8080;

var express = require('express');
var app = express();

app.listen(80, function () {
    console.log('Example app listening on port 80!');
});

var express = require('express');
var app = express();
app.use('/src', express.static(__dirname));
app.listen(8080, function () {
    console.log('Example app listening on port 80!');
});
