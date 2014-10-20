/**
 * @fileoverview markdown related method
 *
 */

var marked = require('marked');
var hljs = require('highlight.js');
var util = require('./util');


var expose = {
    getTitle: function(text){
        var lines = text.split("\n");
        var arr = [];
        for(var i = 0; i < lines.length; i++){
            var reg = /^\s*#([^#]*?)$/;
            var match = reg.exec(lines[i]);
            if(match){
                return util.trim(match[1]);
            }
        }
        return null;
    },
    highlight:function(code, lang){
        var o;

        if(lang == 'js') {
            lang = 'javascript';
        } else if (lang == 'html') {
            lang = 'xml';
        }

        if(lang){
            o = hljs.highlight(lang, code);
        } else {
            o = hljs.highlightAuto(code).value;
        }
        var html = o.value;
        if(html){
            return html;
        } else {
            return code;
        }
    },
    init:function(){
        // set default marked opt
        marked.setOptions({
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            langPrefix: '',
            highlight: this.highlight
        });
        return marked;
    }
};

util.merge(exports, expose);

