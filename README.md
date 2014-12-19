mdserver
==============

 [![Build Status](https://api.travis-ci.org/zhiyelee/mdserver.svg)](http://travis-ci.org/zhiyelee/mdserver)
[![NPM Version](http://img.shields.io/npm/v/mdserver.svg?style=flat)](https://www.npmjs.org/package/mdserver)
[![NPM Downloads](https://img.shields.io/npm/dm/mdserver.svg?style=flat)](https://www.npmjs.org/package/mdserver)

Static http server with markdown supported.

`mdserver` can start a http server with given directory(default to current directory) as the `DocumentRoot`. U can also specify the port.

Beside `markdown` files, mdserver` supports most of the common used file types, include `html`, `json`, and other static files like `js`, `css`, and `png` etc. Due to those, `mdserver` can also be simply used as a alternative to the `python -m SimpleHTTPServer`.


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

### --ftpl

Type: `Path | String`
Default: `public/fileTpl.html`

There are two types of pages  
* `directory` page:  list the files and directories of the current dictionary
* `file` page:  content of the current file

`ftpl` is the template used for the `file` pages.  If not set, the option will use the default file provided by the application

### --dtpl

Type: `Path | String`
Default: `public/dirTpl.html`

Template used for the `directory` pages.  If not set, the option will use the default file provided by the application

### -l, --style

Type: `Path | String`
Default: `public/screen.css`

Stylesheet used for the both the `directory` and `file` page. If not set, the option will use the default value provided by the application


### --view

Type: `String`
Default: `details`

Display mode.
* `tiles` only display file name
* `details` display name, size and mtime

## Examples

```sh
# use default options
mdserver

# custom port, root, and style
mdserver -p 8788 -r ~/github/mdserver -l ~/github/style/base.css
```

Visit: `http://localhost:8788 `

## Snapshot

![snapshot](https://github.com/zhiyelee/mdserver/raw/master/snapshot.png)
