#!/usr/bin/env node
var program = require('commander');
var pkg = require('./package.json');
var serve = require('./lib/server');

program
    .version(pkg.version)
    .option('-p, --port <num>', 'serve with given port')
    .option('-r, --root <path>', 'serve given path')
    .parse(process.argv);

serve(program.opts());

