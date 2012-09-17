#!/usr/bin/env node
var http = require('http');
var path = require('path');
var handler = require('../lib/handler');

function usage() {
    console.log('mdserv init <directory>');
    console.log('mdserv serve <directory> <port>');
}

function serve(directory, port) {

    directory = path.resolve(directory || '.');

    var handlerInstance = handler(directory);
    http.createServer(handlerInstance).listen(port || 0xD0C);
}

function init(directory) {
}

var args = process.argv.slice(2);

var command = (args[0] || '').toLowerCase();
var directory = args[1];
var port = Number(args[2]);

switch (command) {
    case 'init':
        return init(directory);
    case 'serve':
        serve(directory, port);
        return;
    default:
        return usage(); 
}
