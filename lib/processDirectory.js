var fs = require('fs');
var path = require('path');
var simpleMustache = require('./simpleMustache');

module.exports = function(wwwRoot) {

    var templatePath = path.resolve(wwwRoot, '.template.html');

    function handleError(res) {
        res.writeHead(500, {'content-type': 'text/plain'});
        res.end('500 = something went wrong');
    }

    return function(dirPath, res) {

        fs.readdir(dirPath, function(err, files) {

            if (err) { return handleError(res); }

            var results = files.map(function() { return false; });

            function check() {
                if (results.length < files.length + 1) { return; }

                var complete = results.every(function(r) { return !!r; });
                if (!complete) { return; }

                var template = results.pop();
                var body = results.map(function(res) {
                    var filename = path.basename(res.file);
                    if (filename[0] === '.') { return ''; }

                    var cls = res.stat.isDirectory() ? 'dir':'file';
                    return '<p>' +
                        '[' + cls + '] ' +
                        '<a href="' + res.file.replace('\\', '/') + '">' +
                        filename +
                        '</a>'+
                        '</p>';

                }).reduce(function(prev, curr) {
                    return prev + curr;
                }, '');

                var title = 'directory listing of /' +
                    dirPath.substring(wwwRoot.length);

                var rendered = simpleMustache(template, {
                    title: title,
                    body: '<h1>' + title  + '</h1>' + body
                });

                res.writeHead(200, {'content-type': 'text/html'});
                res.end(rendered);
            }

            fs.readFile(templatePath, 'utf8', function(err, data) {
                if (err) { return handleError(res); }
                results[files.length] = data;
                check();
            });

            files.forEach(function(file, index) {
                var filePath = path.join(dirPath, file);
                fs.stat(filePath, function(err, stat) {
                    results[index] = {
                        file: filePath.substring(wwwRoot.length),
                        stat: stat
                    };
                    check();
                });
            });
        });
    };
};