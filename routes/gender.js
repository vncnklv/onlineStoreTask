const _ = require('underscore');
const limitVals = ['mens', 'womens'];

module.exports = async function routeGender(req, res) {
    const { params } = req;

    // Verification
    if (!limitVals.includes(params.gender)) res.send(404);

    const { db } = req.app.locals;

    let items = await db
        .collection('categories')
        .findOne({ id: params.gender });

    if (params.category) {
        items.categories.forEach((category) => {
            if (category.id == params.category) items = category;
        });
    }

    console.log(items);

    res.render('gender', {
        _,
        items,
        title: items.page_title,
    });
};
