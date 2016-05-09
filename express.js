#!/usr/local/bin/node --harmony

// //////////////////////////////////////
//
// Node Secure Server (SSL)
//   localhost:8080/src/msgetstarted.html
//
////////////////////////////////////////


var readline = require('readline');
var readlineSync = require('readline-sync');
var http = require('http');
var opn = require('opn');
var fetch = require('node-fetch');
var colors = require('colors');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


var authUser = () => {
    console.log('enter your enterprise login name?'.green);
    rl.question('', (answer) => {
        console.log('enter your enterprise password?'.green);
        rl.question('', (answer) => {
            console.log('connecting to mediaCLOUD...'.green);

            fetch('https://api.github.com/users/github')
                .then(function(res) {
                    return res.json();
                }).then(function(json) {

                if (true) {
                    console.log('installing credentials'.magenta)
                    console.log('start server'.magenta)
                    rl.close();
                    initServer();
                } else {
                    console.log('Error: user could not be authenticated'.red);
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
        console.log('Now opening your browser to http://localhost:8080/msgetstarted/msgetstarted.html'.yellow);
    });
    opn('http://localhost:8080/msgetstarted/msgetstarted.html');

}

authUser();