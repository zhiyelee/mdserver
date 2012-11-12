var fs = require('fs'),
    path = require('path'),
    CONFIG = require('../lib/config'),
    simpleMustache = require('./simpleMustache');

module.exports = function(rootDir) {

    var templatePath = path.resolve(rootDir, CONFIG['templatePath']),
        styleSheetPath = CONFIG['styleSheetPath'];
    console.log(templatePath);

    function handleError(res) {
        res.writeHead(500, {'content-type': 'text/plain'});
        res.end('500 = something went wrong');
    }

    function win(string) {
        return string.replace(/\\/g, '/');
    }

    return function(dirPath, res) {

        fs.readdir(dirPath, function(err, files) {

            if (err) { return handleError(res); }
            console.log('enter path:' + dirPath);

            var results = files.map(function() { return false; });
            function check() {

                // ?
                if (results.length < files.length + 1) { return; }

                var complete = results.every(function(r) { return !!r; });
                if (!complete) { return; }

                var template = results.pop();
                var body = results.map(function(res) {
                    var filename = path.basename(res.file);
                    console.log(filename);
                    if (filename[0] === '.') { return ''; }

                    var cls = res.stat.isDirectory() ? 'dir':'file';
                    return '<li>' +
                            '[' + cls + '] ' +
                            '<a href="' + win(res.file) + '">' +
                            filename +
                            '</a>'+
                            '</li>';

                }).reduce(function(prev, curr, index, obj) {
                    return prev + curr;
                }, '');

                body = '<ul>' + body + '</ul>';

                var title = win(dirPath.substring(rootDir.length) || '/');

                console.log(path.resolve(__dirname, 'base.css'));
                var rendered = simpleMustache(template, {
                    title: title,
                    body: '<h1> ls of dir: ' + title  + '</h1>' + body,
                    styleSheet: styleSheetPath
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
                        file: filePath.substring(rootDir.length),
                        stat: stat
                    };
                    check();
                });
            });
        });
    };
};
