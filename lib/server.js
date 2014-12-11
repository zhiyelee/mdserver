"use strict";
var connect = require('connect');
var serveIndex = require('serve-index');
var serveStatic = require('serve-static');
var serveMarkdown = require('serve-markdown');
var chalk = require('chalk');
var moment = require('moment');
var path = require('path');


/**
 * init options
 */
function initOptions(options) {
  var defaultOptions = {
    root: process.cwd(),
    port: '3333',
    style: path.resolve(__dirname, '../public/screen.css'),
    dtpl: path.resolve(__dirname, '../public/dirTpl.html'),
    ftpl: path.resolve(__dirname, '../public/fileTpl.html'),
    silent: false

  };
  return merge(defaultOptions, options);
}

/**
 * start server with provided options
 */
function startServer(options) {

  options = initOptions(options);

  var app = connect();
  var root = options.root;
  var isTest = process.env.isTest;
  var isSilent = options.silent || isTest;

  if (!isSilent) {
    app.use(log);
  }

  var smOpts = {};
  var smOptMap = {
    ftpl: 'template',
    style: 'style'
  };
  Object.keys(smOptMap).forEach(function (key) {
    if (options[key] !== undefined) smOpts[smOptMap[key]] = options[key];
  });

  // serve markdown file
  app.use(serveMarkdown(root, smOpts));
  // common files
  app.use(serveStatic(root, {index: ['index.html']}));

  // serve directory
  app.use(serveIndex(root, {
    icon: true,
    template: options.dtpl,
    stylesheet: options.style,
    // todo add style for no detail
    view: 'details'
  }));

  if (!isTest) {
    app.listen(options.port);
  }
  showSuccessInfo(options);

  return app;
}

module.exports = startServer;

/**
 * show server starting information
 */
function showSuccessInfo(options) {

  // server start success
  if (options.silent || process.env.isTest) return;

  console.log(chalk.blue('serve start Success: ')
      + '\n'
      + chalk.green('\t url   ')
      + chalk.grey('http://127.0.0.1:')
      + chalk.red(options.port)
      + chalk.grey('/')
      + '\n'
      + chalk.green('\t serve ')
      + chalk.grey(options.root)
  );

}

/**
 * simple log middleware, output the access log
 **/
function log(req, res, next) {
  console.log('['
      + chalk.grey(ts())
      + '] '
      + chalk.white(decodeURI(req.url))
  );
  next();
}

/**
 * get current timestamp
 */
function ts() {
  return moment().format('HH:mm:ss')
}

/**
 * simple merge
 * @description if property `p` of a is not `undefined`, set a[p] = b[p]
 */
function merge(a, b) {
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  for (var p in b) {
    if (hasOwnProperty.call(b, p) && b[p] !== undefined) {
      a[p] = b[p];
    }
  }

  return a;
}
