const _ = require('underscore');

module.exports = async function routeGender(req, res) {
    const { params } = req;
    const { db } = req.app.locals;

    const items = await db
        .collection('categories')
        .find({ id: params.gender })
        .toArray();

    res.render('gender', {
        _,
        items,
    });
};
