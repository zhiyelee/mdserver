var path = require('path'),
    CONFIG = {
       // config dir of the target dir
       configDir: '.mdserver',
       // local config dir
       templateDir: '../template',
       // default port
       port: '7878',
       host: 'localhost',
       division: '*=====================================*'
    };

// style path
CONFIG['styleSheetPath'] = CONFIG['configDir'];

// template path
CONFIG['templatePath'] = CONFIG['configDir'] + '/template.html';

// server start tips
CONFIG['startTips'] = 'mdserver started, please visit: http://' + CONFIG['host'] + ':';

// server init command
CONFIG['initCmd'] = 'cp -rf ' + path.resolve(__dirname, CONFIG['templateDir']) + '/*  ';

module.exports = CONFIG;
