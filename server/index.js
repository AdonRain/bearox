'use strict';

var config = require('config');
var ubique = require('ubique');
var server = require('koa-static');

var render = require('./middlewares/render');
var mongo = require('./middlewares/mongo');
var route = require('./middlewares/route');

var app = require('koa')();

app.use(server(config.statics));

app.use(mongo());

app.use(render(app));

route(app, config.controllers);

app.listen(9527, function() {
    console.log('@9527');
});
