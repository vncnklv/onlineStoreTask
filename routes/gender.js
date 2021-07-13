const _ = require('underscore');
// const mongoUtil = require('../dbconnection');

// const db = mongoUtil.getDb();

module.exports = function routeGender(req, res) {
  const { params } = req;
  const { db } = req.app.locals;

  db.collection('categories').find({ id: params.gender }).toArray((collErr, items) => {
    res.render('gender', {
      _,
      items,
    });
  });
};
