var path = require('path'),
    CONFIG = {
       // config dir of the target dir
       configDir: '.mdserver',
       // local config dir
       localConfigDir: '../config',
       // default port
       port: '7878',
       host: 'localhost',
       division: '*=====================================*',
       copyright: '-- by zhiyelee <http://blog.tsnrose.com>',
    };

// style path
CONFIG['styleSheetPath'] = CONFIG['configDir'] + '/base.css';

// template path
CONFIG['templatePath'] = CONFIG['configDir'] + '/template.html';

// server start tips
CONFIG['startTips'] = 'mdserver started, please visit: http://' + CONFIG['host'] + ':';

// server init command
CONFIG['initCmd'] = 'cp -rf ' + path.resolve(__dirname, CONFIG['localConfigDir']) + '/*  ';

module.exports = CONFIG;
