#!/usr/local/bin/node --harmony

// //////////////////////////////////////
//
// Node Secure Server (SSL)
//   localhost:8080/src/msgetstarted.html
//
////////////////////////////////////////


var readline = require('readline');
var http = require('http');
var opn = require('opn');
var fetch = require('node-fetch');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var authUser = () => {
    rl.question('\n\nenter your enterprise login name? ', (answer) => {
        rl.question('enter your enterprise password? ', (answer) => {
            console.log('connecting to mediaCLOUD...');

            fetch('https://api.github.com/users/github')
                .then(function(res) {
                    return res.json();
                }).then(function(json) {

                if (true) {
                    console.log('installing credentials')
                    console.log('start server')
                    rl.close();
                    initServer();
                } else {
                    console.log('Error: user could not be authenticated');
                    authUser();
                }
            });
        });
    });
}

var initServer = ()=> {
    var globs = {};
    globs.IPLISTEN = '127.0.0.1';
    globs.PORT_LISTEN_DIST = 8080;

    var express = require('express');
    var app = express();

    var express = require('express');
    var app = express();
    app.use('/msgetstarted', express.static(__dirname));
    app.listen(globs.PORT_LISTEN_DIST, function () {
        console.log('Now open your browser to  http://localhost:8080/src/msgetstarted.html');
    });
    opn('http://localhost:8080/msgetstarted/msgetstarted.html');

}

authUser();