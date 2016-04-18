'use strict';

var mongo = require('koa-mongo');

module.exports = function() {
    return mongo({
        uri: 'mongodb://localhost:27017/bearox',
        max: 100,
        min: 1,
        timeout: 200,
        log: false
    });
};
