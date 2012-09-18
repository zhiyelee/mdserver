var fs = require('fs');
var path = require('path');

module.exports = function(directory, cb) {

    var callback = function() {
        if (cb) {
            cb = null;
            cb.apply(null, arguments);
        }
    };

    var templateName = '.template.html';
    var source = path.resolve(__dirname, '../template', templateName);
    var target = path.resolve(directory, templateName);

    fs.exists(target, function(exist) {
        var sourceStream = fs.createReadStream(source);
        var targetStream = fs.createWriteStream(target);
        targetStream.on('error', callback);
        
        sourceStream.pipe(targetStream);
        sourceStream.on('end', callback);
    });
};