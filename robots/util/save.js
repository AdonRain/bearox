'use strict';

var mongodb = require('mongodb').MongoClient;

module.exports = save;

function save(opt) {
    mongodb.connect(`mongodb://localhost:27017/${opt.db}`, function(err, db) {
        db.collection(opt.collection).find(opt.which).toArray(function(err, doc) {
            if (!doc.length) {
                db.collection(opt.collection).insert(opt.which);
                save(opt);
            } else {
                db.collection(opt.collection).update(opt.which, {
                    $set: opt.what
                },function (err,result){
                    db.close();
                });
            }
        });
    });
}
