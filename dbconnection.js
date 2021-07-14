const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';

let db;

module.exports = {
    connectToServer(callback) {
        MongoClient.connect(
            url,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
                db = client.db('store');
                return callback(err);
            }
        );
    },

    getDb() {
        return db;
    },
};
