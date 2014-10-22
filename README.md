mdserver
==============

[![NPM Version](http://img.shields.io/npm/v/mdserver.svg?style=flat)](https://www.npmjs.org/package/mdserver)
[![NPM Downloads](https://img.shields.io/npm/dm/mdserver.svg?style=flat)](https://www.npmjs.org/package/mdserver)

markdown http server

##installation

    npm install mdserver -g

## usage

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

```sh
# use current dir and default port 3333
mdserver

# set root dir and port
mdserver -p 8788 -r ~/github/mdserver
```
... To be Continued...
