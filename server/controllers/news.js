'use strict';

var route = require('koa-route');

module.exports = function() {
    return route.get('/news', function*(next) {
        let tmp =
            yield this.mongo.db('bearox').collection('news').findOne({
                src: 'chinanews'
            });
        yield this.render('news', {
            data: JSON.stringify(tmp.dataList)
        });
    });
};
