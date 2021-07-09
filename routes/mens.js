const _ = require('underscore');
const mdbClient = require('mongodb').MongoClient;

module.exports = function routeIndex(req, res) {
  mdbClient.connect('mongodb://localhost:27017', (err, client) => {
    const db = client.db('store');
    const collection = db.collection('categories');
    collection.find({ id: 'mens' }).toArray((collErr, items) => {
      res.render('index', {
        _,
        items,
      });
      client.close();
    });
  });
};
