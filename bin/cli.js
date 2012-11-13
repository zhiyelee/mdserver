#!/usr/bin/env node
var http = require('http'),
    path = require('path'), 
    init = require('../lib/init'),
    CONFIG = require('../lib/config'),
    handler = require('../lib/handler');

function usage() {
    console.log('mdserv init [directory]');
    console.log('mdserv serve [directory] [port]');
}

function serve(directory, port) {
    directory = path.resolve(directory);

    var handlerInstance = handler(directory);

    http.createServer(handlerInstance).listen(port || CONFIG['port']);
}

function showServerStartInfo(port) {

    var now = (new Date()).toLocaleString(),
        CONFIG_STARTTIPS = CONFIG['startTips'] + port,
        CONFIG_DIVISION = CONFIG['division'];

    console.log(CONFIG_DIVISION);
    console.log(now);
    console.log(CONFIG['copyright']);
    console.log(CONFIG_STARTTIPS);
    console.log(CONFIG_DIVISION);
}

var args = process.argv.slice(2),
    command = (args[0] || '').toLowerCase(),
    directory = args[1] || '.',
    port = Number(args[2]) || CONFIG['port'];

switch (command) {
    case 'init':
        return init(directory);
    case 'serve':
        serve(directory, port);
        showServerStartInfo(port);
        return;
    default:
        return usage(); 
}
