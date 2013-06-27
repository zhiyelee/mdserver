var fs = require('fs'),
    path = require('path'),
    mime = require('mime'),
    marked = require('marked'),
    CONFIG = require('../lib/config'),
    simpleMustache = require('./simpleMustache');

module.exports = function(rootDir) {

    function serveFile(file, ext, res) {
        var stream = fs.createReadStream(file),
            contentType = mime.lookup(ext);
        res.writeHead(200, { 'content-type': contentType });
        stream.pipe(res);
    }

    function serveMarkdown(file, res) {
        var status = {error: false};
        function checkDone() {
            if (status.error) {
                res.writeHead(500, {'content-type': 'text/plain'});
                return res.end('something went wrong');
            }

            if (status.template && status.markdown) {
                var html = marked(status.markdown), 
                    match = status.markdown.match(/^#([^#\r\n]+)/), 
                    title = match && match[1] || path.basename(file),
                    styleSheetPath = CONFIG['styleSheetPath'];

                var doc = simpleMustache(status.template, {
                    title: title,
                    body: html,
                    styleSheet: styleSheetPath
                });

                res.writeHead(200, {'content-type': 'text/html'});
                res.end(doc);
            }
        }


        var templatePath = path.resolve(rootDir, CONFIG['templatePath']);
        fs.readFile(templatePath, 'utf8', function(err, template) {
            status.error = err;
            status.template = template;
            checkDone();
        });

        fs.readFile(file, 'utf8', function(err, markdown) {
            status.error = err;
            status.markdown = markdown;
            console.log('resolve file: ' + file);
            checkDone();
        });
    }

    return function(file, res) {
        var ext = path.extname(file).toLowerCase();

        if (['.md', '.markdown', '.txt'].indexOf(ext) !== -1) {
            return serveMarkdown(file, res);
        } 
        serveFile(file, ext, res);
    };
};
