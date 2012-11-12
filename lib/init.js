var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    CONFIG = require('../lib/config');

module.exports = function(directory, cb) {

    // 复制config文件夹到目标目录
    var configDir = path.resolve(directory, CONFIG['configDir']),
        initCmd = 'mkdir ' + configDir + '&&' + CONFIG['initCmd'] + configDir;
    var child = exec(initCmd, function(error, stdout, stderr) {
        console.log(initCmd);
        console.log(stdout);
    });
    /**
    var callback = function() {
        if (cb) {
            cb = null;
            cb.apply(null, arguments);
        }
    };

    var templateName = '.template.html',
        source = path.resolve(__dirname, '../template', templateName),
        target = path.resolve(directory, templateName);

    fs.exists(target, function(exist) {
        var sourceStream = fs.createReadStream(source),
            targetStream = fs.createWriteStream(target);

        targetStream.on('error', callback);
        
        sourceStream.pipe(targetStream);
        sourceStream.on('end', callback);
    });

    // 复制文件夹
    function cpDir(srcDir,targetDir) {
    }
    */

};
