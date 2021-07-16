const _ = require('underscore');

module.exports = async function routeCategory(req, res) {
    const { params } = req;

    const { db } = req.app.locals;

    let title = '';

    const gender = await db
        .collection('categories')
        .findOne({ id: params.gender });

    if (gender == null) res.status(404).send('Not found');

    gender.categories.forEach((category) => {
        if (category.id === params.category) {
            title = category.page_title;
        }
    });

    let items = await db
        .collection('products')
        .find({ primary_category_id: params.subcategory })
        .toArray();

    if (items == null) {
        res.status(404).send('Not found');
        return;
    }

    res.render('category', {
        _,
        items,
        title,
        category: params.category,
        subcategory: params.subcategory,
    });
};
