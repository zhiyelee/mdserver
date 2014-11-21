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

### -p, --port

Type: `Number`
Default: `3333`

The `port` used by the server. Default to `3333`

### -r, --root

Type: `Path`
Default: current work dictionary (`cwd`)

The `DocumentRoot` for the server.

### -s, --silent

Type: `Boolean`
Default: `false`

Silent mode. When set to `true`, there will no logs been displayed.

### -t, --template

Type: `Path | String`
Default: `undefined`

Template used for the markdown pages.  If not set, the option will use the default value provided by the `serve-markdown` middleware.
More about the option please refer to [server-markdown](https://github.com/zhiyelee/serve-markdown#template)

### -l, --style

Type: `Path | String`
Default: `undefined`

Stylesheet used for the markdown pages. If not set, the option will use the default value provided by the `serve-markdown` middleware.
More about the option please refer to [server-markdown](https://github.com/zhiyelee/serve-markdown#template)

## Examples

```sh
# use default options
mdserver

# custom port, root, and style
mdserver -p 8788 -r ~/github/mdserver -l ~/github/style/base.css
```

Visit: `http://localhost:8788 `
