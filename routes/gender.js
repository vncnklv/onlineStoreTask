const _ = require('underscore');
const limitVals = ['mens', 'womens'];

module.exports = async function routeGender(req, res) {
    const { params } = req;

    // Verification
    if (!limitVals.includes(params.gender)) res.send(404);

    const { db } = req.app.locals;

    const items = await db
        .collection('categories')
        .findOne({ id: params.gender });

    res.render('gender', {
        _,
        items,
        title: items.page_title,
    });
};
