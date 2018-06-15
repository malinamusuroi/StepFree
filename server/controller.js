var mongodb = require('mongodb').MongoClient;

var connectionUrl = 'mongodb://admin:group25app@ds261040.mlab.com:61040/stepfree';
var assert = require('assert');

const dbName = "stepfree";

module.exports = {
    bla: function () {
        mongodb.connect(connectionUrl, function (err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to the server");
            const db = client.db(dbName);

            putReview(db, "Moorgate", 10, (stationName, review, result) => {
                if (result.length === 0) {
                    insertReview(db, stationName, review, (result) => {
                        client.close();
                    });
                } else {
                    const avg = (result[0].review + review)/ 2 ;
                    updateReview(db, stationName, avg, (result) => {
                        client.close();
                    });
                }
            });
        });
    }
};

function insertReview (db, stationName, review, callback) {
    const collection = db.collection('stations');
    collection.insertMany([
        {name: stationName, review: review}
    ], function (err, result) {
        assert.equal(err, null);
        callback(result);
    });
}

function updateReview (db, stationName, review, callback) {
    const collection = db.collection('stations');
    collection.updateOne({ name: stationName }
        , { $set: { review: review } }, function(err, result) {
            assert.equal(err, null);
            console.log("Updated the document with the field a equal to 2");
            callback(result);
        });
}

function putReview(db, stationName, review, callback) {
    const collection = db.collection('stations');
    collection.find({name: stationName}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(stationName, review, docs);
    });
}

