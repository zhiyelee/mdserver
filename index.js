#!/usr/bin/env node
var program = require('commander');
var pkg = require('./package.json');
var serve = require('./lib/server');

program
    .version(pkg.version)
    .option('-p, --port <num>', 'serve with given port')
    .option('-r, --root <path>', 'serve given path')
    .option('-s, --silent', 'silent model without any log shown')
    .option('--ftpl <filetpl>', 'template string or template-file path for markdown pages')
    .option('--dtpl <dirtpl>', 'template string or template-file path for directory pages')
    .option('-l, --style <style>', 'style string or stylesheet-file path for markdown pages')
    .option('--view <view mode>', 'display mode')
    .parse(process.argv);

serve(program.opts());