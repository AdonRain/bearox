'use strict';

var render = require('koa-ejs');
var config = require('config');

module.exports = function(app) {
    return function*(next) {
        render(app, {
            root: config.view,
            layout: false,
            viewExt: 'html',
            cache: false,
            debug: true,
            open: '{{',
            close: '}}'
        });
        yield next;
    };
};
