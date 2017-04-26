#!/usr/local/bin/node --harmony

////////////////////////////////////////
//
// Node Secure Server (SSL)
//   localhost:8080/src/msgetstarted.html
//
////////////////////////////////////////

var readlineSync = require('readline-sync');
var http = require('http');
var opn = require('opn');
var fetch = require('node-fetch');
var colors = require('colors');
var cheerio = require('cheerio');
var replace = require("replace");
var fs = require('fs');

var whiteLabel = {
    logoLink: '',
    logoFileName: '',
    logoToolTip: '',
    eri: '',
    resellerId: '',
    mediaCloud: '',
    company: '',
    chatLink: '',
    domain: 'galaxy.signage.me',
    protocol: 'https://'
}

var init = () => {
    console.log('would you like to setup branding?[Y/n]'.green);
    if (readlineSync.question('') == 'n') {
        // initServer();
    } else {
        authUser();
    }
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

    console.log('will this be hosted on the default mediaCloud?[Y/n]'.green);
    if (readlineSync.question('') == 'n') {
        whiteLabel.mediaCloud = false;

        console.log('will this be hosted on the default mediaCloud?[Y/n]'.green);
        if (readlineSync.question('') == 'n') {

        }
    } else {
        whiteLabel.mediaCloud = true;
    }

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
    fetch(`https://galaxy.signage.me/WebService/ResellerService.ashx?command=LoadResellerInfo&resellerId=${i_resellerId}`)
        .then(function (res) {
            return res;
        }, function () {
            console.log('\nthere was a problem contacting the remote server\n'.red);
            process.exit();
        }).then(function (res) {
        res.text().then(function (xml) {
            $ = cheerio.load(xml);
            $('Logo').each(function (i, o) {
                whiteLabel.logoToolTip = o.attribs.tooltip;
                whiteLabel.logoLink = o.attribs.link;
                whiteLabel.logoFileName = o.attribs.filename;
                whiteLabel.logoFullLink = 'http://galaxy.signage.me/Resources/Resellers/' + whiteLabel.resellerId + '/' + o.attribs.filename;
            });
            $('Chat').each(function (i, o) {
                whiteLabel['chatLink'] = o.attribs.link;
            });
            $('BusinessInfo').each(function (i, o) {
                whiteLabel['company'] = o.attribs.name;
            });
            $('Command').each(function (i, o) {
                if (o.attribs.label == '' && o.attribs.id == 'help2') {
                    whiteLabel['videos'] = o.attribs.href;
                } else {
                    whiteLabel[o.attribs.label] = o.attribs.href;
                }
            });
            injectBranding();
            compile();

        }, function () {
        });
    }, function () {
        console.log('\nUser name or password did not match for the given enterprise user...\n'.red);
        process.exit();
    });
}

var compile = () => {
    console.log('please wait, compiling with webpack...');
    var process = require('child_process');
    process.exec('npm run dev', function (error, stdout, stderr) {
        if (error)
            console.log(error.code);
    });
}

var injectBranding = () => {
    console.log(whiteLabel);
    replace({
        regex: "\/\/ START_REDIRECT[^]+\/\/ END_REDIRECT",
        replacement: `\/\/ START_REDIRECT\n\t\t\t\t BB.CONSTS.REDIRECT = '${whiteLabel['Visit site']}' \n\t\t\t\t\/\/ END_REDIRECT`,
        paths: ['App.js'],
        recursive: false,
        silent: false
    });

    replace({
        regex: "\/\/ START_RESELLER[^]+\/\/ END_RESELLER",
        replacement: `\/\/ START_RESELLER\n\t\t\t\t BB.CONSTS.RESELLER = '${whiteLabel['resellerId']}' \n\t\t\t\t\/\/ END_RESELLER`,
        paths: ['App.js'],
        recursive: false,
        silent: false
    });

    replace({
        regex: "\/\/ START_ERI[^]+\/\/ END_ERI",
        replacement: `\/\/ START_ERI\n\t\t\t\t BB.globs\['ERI'\] = '${whiteLabel['eri']}' \n\t\t\t\t\/\/ END_ERI`,
        paths: ['App.js'],
        recursive: false,
        silent: false
    });


    replace({
        regex: "\/\/ START_CLOUD[^]+\/\/ END_CLOUD",
        replacement: `\/\/ START_CLOUD\n\t\t\t\t BB.globs\['CLOUD'\] = ${whiteLabel['mediaCloud']} \n\t\t\t\t\/\/ END_CLOUD`,
        paths: ['App.js'],
        recursive: false,
        silent: false
    });

    replace({
        regex: "\/\/ START_CHAT[^]+\/\/ END_CHAT",
        replacement: `\/\/ START_CHAT\n\t\t\t\t BB.globs\['CHAT'\] = '${whiteLabel['chatLink']}' \n\t\t\t\t\/\/ END_CHAT`,
        paths: ['App.js'],
        recursive: false,
        silent: false
    });

    replace({
        regex: "\/\/ START_COMPANY[^]+\/\/ END_COMPANY",
        replacement: `\/\/ START_COMPANY\n\t\t\t\t BB.globs\['COMPANY'\] = '${whiteLabel['company']}' \n\t\t\t\t\/\/ END_COMPANY`,
        paths: ['App.js'],
        recursive: false,
        silent: false
    });

    //todo: 5-10-2016 future support for private and hybrid servers
    replace({
        regex: "\/\/ START_PROTOCOL[^]+\/\/ END_PROTOCOL",
        replacement: `\/\/ START_PROTOCOL\n\t\t\t window\.g_protocol =  '${whiteLabel['protocol']}' \n\t\t\t\/\/ END_PROTOCOL`,
        paths: ['App.js'],
        recursive: false,
        silent: false
    });

    replace({
        regex: "\/\/ START_MASTER[^]+\/\/ END_MASTER",
        replacement: `\/\/ START_MASTER\n\t\t\t window\.g_masterDomain =  '${whiteLabel['domain']}' \n\t\t\t\/\/ END_MASTER`,
        paths: ['App.js'],
        recursive: false,
        silent: false
    });

    // initServer();
}

// var initServer = ()=> {
//     var globs = {};
//     globs.IPLISTEN = '127.0.0.1';
//     globs.PORT_LISTEN_DIST = 8085;
//     var express = require('express');
//     var app = express();
//     app.use('/', express.static('bundleFiles'));
//     app.use(express.static(__dirname));
//     app.listen(globs.PORT_LISTEN_DIST, function () {
//         console.log('Now opening your browser to http://localhost:8085/msgetstarted.html'.yellow);
//     });
//     opn('http://localhost:8085/msgetstarted.html');
// }

init();
