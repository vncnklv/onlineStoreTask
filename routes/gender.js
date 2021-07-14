const _ = require('underscore');
const limitVals = ['mens', 'womens'];

module.exports = async function routeGender(req, res) {
    const { params } = req;

    // Verification
    if (!limitVals.includes(params.gender)) res.send(404);

    const { db } = req.app.locals;

    const items = await db
        .collection('categories')
        .find({ id: params.gender })
        .toArray();

    const breadcrumb = [];
    breadcrumb.push(items[0].name);

    res.render('gender', {
        _,
        items,
        title: items[0].page_title,
        breadcrumb,
    });
};
