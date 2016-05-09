#!/usr/local/bin/node --harmony

// //////////////////////////////////////
//
// Node Secure Server (SSL)
//   localhost:8080/src/msgetstarted.html
//
////////////////////////////////////////


var request = require('request');
var readlineSync = require('readline-sync');
var http = require('http');
var opn = require('opn');
var fetch = require('node-fetch');
var colors = require('colors');
var cheerio = require('cheerio');

var whiteLabel = {
    logoLink: '',
    logoFileName: '',
    logoToolTip: '',
    eri: '',
    resellerId: ''

}

var authUser = () => {
    console.log('enter your enterprise login name?'.green);
    var user = readlineSync.question('');
    if (user == '') {
        console.log('not a valid enterprise user name or email'.red);
        process.exit();
    }
    console.log('enter your enterprise password?'.green);
    var pass = readlineSync.question('');
    if (pass == '') {
        console.log('not a valid enterprise password'.red);
        process.exit();
    }

    user = 'reseller@ms.com'
    pass = '123123';

    fetch(`https://galaxy.signage.me/WebService/ResellerService.ashx?command=GetEri&resellerUserName=${user}&resellerPassword=${pass}`)
        .then(function (res) {

            return res.json();

        }, function () {
            console.log('\nthere was a problem contacting the remote server\n'.red);
            process.exit();

        }).then(function (json) {

        if (json && json.eri) {
            whiteLabel.eri = json.eri;
            whiteLabel.resellerId = json.resellerId;
            console.log('enterprise user authenticated'.green)
            console.log('installing credentials'.magenta)
            console.log('start server'.magenta)
            loadResellerInfo(json.resellerId)

        } else {

            console.log('\nthere was a problem contacting the remote server\n'.red);
            process.exit();
        }
    }, function () {
        console.log('\nUser name or password did not match for the given enterprise user...\n'.red);
        process.exit();
    });
}

var loadResellerInfo = (i_resellerId) => {

    request(`https://galaxy.signage.me/WebService/ResellerService.ashx?command=LoadResellerInfo&resellerId=${i_resellerId}`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            $('Logo').each(function (i, o) {
                whiteLabel.logoToolTip = o.attribs.tooltip;
                whiteLabel.logoLink = o.attribs.link;
                whiteLabel.logoFileName = o.attribs.filename;
            });
            $('Command').each(function (i, o) {
                console.log(o.attribs)
            });
            injectBranding();
        } else {
            console.log('there was a problem accessing branding info for enterprise user');
            process.exit();
        }
    })


    // fetch(`https://galaxy.signage.me/WebService/ResellerService.ashx?command=LoadResellerInfo&resellerId=${i_resellerId}`)
    //     .then(function (res) {
    //         return res;
    //     }, function () {
    //         console.log('\nthere was a problem contacting the remote server\n'.red);
    //         process.exit();
    //     }).then(function (res) {
    //     console.log(res.text().then(function (xml) {
    //         // $ = cheerio.load(xml);
    //         // $('item').each(function (i, o) {
    //         //     var t1 = o.children["1"].children["0"].data;
    //         //     var t2 = cleanChar(t1);
    //         //     titles.push(t2);
    //         //     titleDict[t2] = t1;
    //         // });
    //     },function () {
    //
    //     }))
    // }, function () {
    //     console.log('\nUser name or password did not match for the given enterprise user...\n'.red);
    //     process.exit();
    // });
}


var injectBranding = ()=> {

    initServer();
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
    // opn('http://localhost:8080/msgetstarted/msgetstarted.html');
}

authUser();