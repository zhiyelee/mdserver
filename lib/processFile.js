var fs = require('fs');
var path = require('path');
var mime = require('mime');
var marked = require('marked');
var simpleMustache = require('./simpleMustache');

module.exports = function(wwwRoot) {

    function serveFile(file, ext, res) {
        var stream = fs.createReadStream(file);
        var contentType = mime.lookup(ext);
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
                var html = marked(status.markdown);

                var match = status.markdown.match(/^#([^#\r\n]+)/);

                var title = match && match[1] || 'no title found';

                var doc = simpleMustache(status.template, {
                    title: title,
                    body: html
                });

                res.writeHead(200, {'content-type': 'text/html'});
                res.end(doc);
            }
        }


        var templatePath = path.resolve(wwwRoot, '.template.html');
        fs.readFile(templatePath, 'utf8', function(err, template) {
            status.error = err;
            status.template = template;
            checkDone();
        });

        fs.readFile(file, 'utf8', function(err, markdown) {
            status.error = err;
            status.markdown = markdown;
            checkDone();
        });
    }

    return function(file, res) {
        var ext = path.extname(file).toLowerCase();

        if (['.md', '.markdown'].indexOf(ext) !== -1) {
            return serveMarkdown(file, res);
        } 
        serveFile(file, ext, res);
    };
};