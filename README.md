mdserver
==============

 [![Build Status](https://api.travis-ci.org/zhiyelee/mdserver.svg)](http://travis-ci.org/zhiyelee/mdserver)
[![NPM Version](http://img.shields.io/npm/v/mdserver.svg?style=flat)](https://www.npmjs.org/package/mdserver)
[![NPM Downloads](https://img.shields.io/npm/dm/mdserver.svg?style=flat)](https://www.npmjs.org/package/mdserver)

Static http server with markdown supported.

##Installation

    npm install mdserver -g

## Usage

```sh
✍ mdserver -h

  Usage: mdserver [options]

  Options:

    -h, --help        output usage information
    -V, --version     output the version number
    -p, --port <num>  serve with given port
    -r, --root <path>  serve given path

```

## Examples

### Start server

Like the famous `SimpleHTTPServer` in python, `mdserver` can start a http server with given directory(default to current directory) as the `DocumentRoot`. U can also specify the port which the server used.

```sh
# use current dir and default port 3333
mdserver

# set root dir and port
mdserver -p 8788 -r ~/github/mdserver
```

### Enjoy ur server

Visit: `http://localhost:8788 `

... To be Continued...
