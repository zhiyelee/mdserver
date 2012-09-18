# mdserv
static http server with markdown support

##installation
    npm install mdserv

if you want to use it from the cli install it with

    npm install mdserv -g

## usage

### cli

    mdserv init [directory]

copies the .template.html to the directory. `directory` default to the current
directory. the directory needs to exist, if the template exists, it will be 
overridden.
    
    mdserv serve [directory] [port]

starts a http server, that serves files from the directory.
`directory` defaults to the current directory, `port` defaults to 3340

### module
    var mdserv = require('mdserv');

    mdserve.init(dir, [callback])

    var handler = mdserve.handler(wwwRoot);
    http.createServer(handler).listen(3340);


## customizing
you can edit the `.template.html` and all not `.md` `.markdown` will be served
like from a static webserver.

##license
public domain