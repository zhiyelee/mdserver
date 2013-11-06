# mdserver
markdown http server

##installation
    npm install mdserver

if you want to use it from the cli, install it with

    npm install mdserver -g

## usage

### cli

#### init the target dirctory

    mdserver init [target_directory]

the cmd copies the `config` directory to the `target_directory`, indeed the cmd above equal to execute 

```
cd target_directory
mkdir .mdserver
// $mdserverPath is the absolute path of the mdserver
cp $mdserverPath/config/* .mdserver/
```

target_directory default to the current directory. The directory needs to exist, if the `.mdserver` directory exists, it will be overridden.

#### start the server

    mdserver serve [directory] [port]

starts a http server, that serves files from the directory.
`directory` defaults to the current directory, `port` defaults to `7878`

### module

```
var mdserver = require('mdserver');

mdserver.init(dir, [callback])

var handler = mdserver.handler(rootDir);
http.createServer(handler).listen(7878);
```


## customizing

* stylesheet

    you can edit the `.mdserver/custom.css` in serverd dir to custom style.
* template
    
    you can also allowed to edit the `.mdserver/template.html`,which is the base template the server form the page.

##license

clone from `git://github.com/Bonuspunkt/mdserv.git`, modified by zhiyelee

