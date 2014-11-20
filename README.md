mdserver
==============

 [![Build Status](https://api.travis-ci.org/zhiyelee/mdserver.svg)](http://travis-ci.org/zhiyelee/mdserver)
[![NPM Version](http://img.shields.io/npm/v/mdserver.svg?style=flat)](https://www.npmjs.org/package/mdserver)
[![NPM Downloads](https://img.shields.io/npm/dm/mdserver.svg?style=flat)](https://www.npmjs.org/package/mdserver)

Static http server with markdown supported.

Like the famous `SimpleHTTPServer` in python, `mdserver` can start a http server with given directory(default to current directory) as the `DocumentRoot`. U can also specify the port.

## Installation

    npm install mdserver -g

## Options

### `-p, --port`

The `port` used by the server. Default to `3333`

### `-r, --root`

The `DocumentRoot` fo the server, Default to `cwd`(current dictionary)

### `-s, --silent`

Use silent model, no logs will be displayed.

### `-t, --template`

Template used for the markdown pages. More about the template option please refer to [server-markdown](https://github.com/zhiyelee/serve-markdown#template)

### `-l, --style`

Stylesheet used for the markdown pages. More info please refer to [serve-markdown](https://github.com/zhiyelee/serve-markdown#template)


```sh
# use current dir and default port 3333
mdserver

# set root dir and port
mdserver -p 8788 -r ~/github/mdserver
```

Visit: `http://localhost:8788 `
