var fs = require('fs');
var path = require('path');

var processDirectory = require('./processDirectory');
var processFile = require('./processFile')

var suffixes = ['/index.md', '/index.markdown', '', '.md', '.markdown'];

module.exports = function(wwwRoot) {

    wwwRoot = path.resolve(wwwRoot);

    processDirectory = processDirectory(wwwRoot);
    processFile = processFile(wwwRoot);

    return function(req, res) {

        var handled, processed = suffixes.map(function(){ return false;});
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


        var reqPath = path.resolve(wwwRoot, './' + req.url);

        if (reqPath.indexOf(wwwRoot) !== 0) {
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
        })
    }
}