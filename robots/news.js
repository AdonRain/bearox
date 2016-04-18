'use strict';

var request = require('request');
var cheerio = require('cheerio');
var config = require('config');
var iconv = require('iconv-lite');
var save = require('./util/save');

var promise = new Promise(function(resolve, reject) {
    let ret = {},
        len = 200,
        count = 0,
        now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth(),
        date = now.getDate();

    for (let i = 0; i < len; i++) {
        let iTime = new Date(year, month, date - i),
            iYear = iTime.getFullYear(),
            iMonth = iTime.getMonth() + 1,
            iDate = iTime.getDate();

        getPage(iYear, addZero(iMonth), addZero(iDate));
    }

    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }

    function getPage(year, month, date) {
        let opt = {
            "method": "GET",
            "uri": `http://www.chinanews.com/scroll-news/cj/${year}/${month}${date}/news.shtml`,
            "User-Agent": config.ua
        };

        try {
            request(opt, function(err, res, body) {
                let iTime=`${year}${month}${date}`;
                let buf = new Buffer(body);
                let html = iconv.decode(buf, 'gb2312');
                let $ = cheerio.load(html);

                console.log(`===page ${iTime}===`);

                ret[iTime] = $('.content_list').find('li').length;

                if (count == len - 1) {
                    resolve(ret);
                } else {
                    count++;
                }
            });
        } catch (e) {
            reject(e);
        }
    }

});

promise.then(function(data) {
    let aVal = [];
    let aKey = Object.keys(data);

    console.log(`has ${aKey.length} items`);

    aKey.sort(function(a, b) {
        return parseInt(a, 10) - parseInt(b, 10);
    });

    aKey.forEach(function(e, i) {
        aVal.push({
            x: e,
            y: data[e]
        });
    });

    save({
        db: 'bearox',
        collection: 'news',
        which: {
            src: 'chinanews'
        },
        what: {
            dataList: aVal
        }
    });

}, function(err) {
    console.log(err);
});
