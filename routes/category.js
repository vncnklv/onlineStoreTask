const _ = require('underscore');

module.exports = async function routeCategory(req, res) {
    const { params } = req;
    const { db } = req.app.locals;

    const items = await db.collection('products').find().toArray();

    res.render('gender', {
        _,
        items,
    });
};
