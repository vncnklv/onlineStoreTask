const _ = require('underscore');
const mongoUtil = require('../dbconnection');

const db = mongoUtil.getDb();

module.exports = function routeGender(req, res) {
  const { params } = req;
  db.collection('categories').find({ id: params.gender }).toArray((collErr, items) => {
    res.render('gender', {
      _,
      items,
    });
  });
};
