const _ = require('underscore');

module.exports = async function routeCategory(req, res) {
    const { params } = req;

    const { db } = req.app.locals;

    const query = await db
        .collection('categories')
        .aggregate([
            { $unwind: '$categories' },
            {
                $match: { 'categories.id': `${params.category}` },
            },
            { $group: { _id: '$categories' } },
        ])
        .toArray();
    const category = query[0]._id;

    console.log(categoryu);

    let title = '';
    category.categories.forEach((cat) => {
        if (cat.primary_category_id == params.subcategory)
            title = cat.page_title;
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
