#!/usr/bin/env node
var app = require('connect')();
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');
var serveMarkdown = require('serve-markdown');
var merge = require('utils-merge');
var options = require('minimist')(process.argv.slice(2));
var chalk = require('chalk');
var moment = require('moment');


var defaultOptions = {
    port: '3333'
};
options = merge(defaultOptions, options);

var root = options.root || process.cwd()

app.use(log);
app.use(serveMarkdown(root));
app.use(serveStatic(root, {
    'index': ['index.html'],
    'setHeaders': function (res, fp) {
        res.setHeader('x-powerby', 'zhiyelee')
    }
}))
app.use(serveIndex(root, {'icon': true}))

app.listen(options.port);

// display serve info
console.log(chalk.blue('serve start Success: ') + chalk.green('http://127.0.0.1:') + chalk.red(options.port) + chalk.green('/'));

function log(req, res, next) {
    console.log('['
                + chalk.grey(ts())
                + '] '
                + chalk.white(decodeURI(req.url))
            );
    next()
}

function ts() {
    return moment().format('HH:mm:ss')
}
