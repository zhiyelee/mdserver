var path = require('path'),
    CONFIG = {
   configDir: '.mdserver',
   localConfigDir: '../config'
};

CONFIG['styleSheetPath'] = CONFIG['configDir'] + '/base.css';
CONFIG['templatePath'] = CONFIG['configDir'] + '/template.html';
CONFIG['initCmd'] = 'cp -rf ' + path.resolve(__dirname, CONFIG['localConfigDir']) + '/*  ';

module.exports = CONFIG;
