var fs = require('fs'),
    path = require('path'),
    CONFIG = require('../lib/config');

var processDirectory = require('./processDirectory'),
    processFile = require('./processFile'),
    suffixes = ['/index.md', '/index.markdown', '', '.md', '.markdown'];

module.exports = function(rootDir) {

    rootDir = path.resolve(rootDir);

    processDirectory = processDirectory(rootDir);
    processFile = processFile(rootDir);

    return function(req, res) {

        var handled,
            processed = suffixes.map(function(){
                return false;
            });

        function checkDone() {

            if (handled) { return; }

            for (var i = 0; i < processed.length; i++) {
                if (processed[i] && processed[i].stat) { break; }
            }

            var allError = processed.every(function(r) { return r && r.err; });
            if (suffixes.length === i && allError) {
                res.writeHead(404, { 'content-type': 'text/plain' });
                res.end('not found');
                return;
            }

            var use = processed[i];

            if (!use) { return; }

            handled = true;
            if (use.stat.isFile()) {
                return processFile(use.file, res);
            } 
            return processDirectory(use.file, res);
        }

        // 解析请求地址
        function parseReqPath(url) {
            var parsedPath,
                configDir = CONFIG['configDir'],
                index = url.indexOf(configDir);
            if (index !== -1) {
               parsedPath = path.resolve(rootDir, url.substr(index));  
            } else {
                parsedPath = path.resolve(rootDir, './' + url);
            }
            return parsedPath;
        }


        var reqPath = parseReqPath(req.url);
        //console.log('reqPath = ' + reqPath);

        if (reqPath.indexOf(rootDir) !== 0) {
            res.writeHead(500, { 'content-type': 'text/plain' });
            res.end('do not want');
            return;
        }

        if (path.basename(reqPath)[0] === '.') {
            res.writeHead(500, { 'content-type': 'text/plain' });
            res.end('do not want');
            return;
        }

        suffixes.map(function(suffix) {
            return reqPath + suffix;
        }).forEach(function(reqPath, index) {
            fs.stat(reqPath, function(err, stat) {
                processed[index] = {
                    file: reqPath,
                    err: err,
                    stat: stat
                };
                checkDone();
            });
        });
    };
};
