'use strict';

var reqDir = require('require-dir');

module.exports = function(app,controllersPath) {
    let controllers = reqDir(controllersPath);
    for (let key in controllers) {
        app.use(controllers[key]());
    }
};
