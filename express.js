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



var authUser = () => {
    console.log('enter your enterprise login name?'.green);
    var user = readlineSync.question('');
    user = 'reseller@ms.com'

    console.log('enter your enterprise password?'.green);
    var pass = readlineSync.question('');
    pass = '123123';

    fetch(`https://galaxy.signage.me/WebService/ResellerService.ashx?command=GetEri&resellerUserName=${user}&resellerPassword=${pass}`)
        .then(function (res) {
            return res.json();
        }, function(){
            console.log('\nthere was a problem contacting the remote server\n'.red);
        }).then(function (json) {
        if (json && json.eri){
            console.log('pass');
        } else {
            console.log('fail');
        }
        if (true) {
            console.log('installing credentials'.magenta)
            console.log('start server'.magenta)
            initServer();
        } else {
            console.log('Error: user could not be authenticated'.red);
            authUser();
        }
    },function () {
        console.log('\nUser name or password did not match for the given enterprise user...\n'.red);
        process.exit();
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
    //opn('http://localhost:8080/msgetstarted/msgetstarted.html');

}

authUser();