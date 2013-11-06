var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    CONFIG = require('../lib/config');

module.exports = function(directory, cb) {

    // 复制config文件夹到目标目录
    var configDir = path.resolve(directory, CONFIG['configDir']),
        initCmd = CONFIG['initCmd'] + configDir;

    if (!fs.existsSync(configDir)) {
        initCmd = 'mkdir ' + configDir + '&&' + initCmd;
    }
    // TODO shelljs?
    var child = exec(initCmd, function(error, stdout, stderr) {
        console.log(initCmd);
        console.log(stdout);
    });
};
