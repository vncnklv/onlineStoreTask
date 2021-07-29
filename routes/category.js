const _ = require('underscore');

module.exports = async function routeCategory(req, res) {
    const { params } = req;

    const { db } = req.app.locals;

    let title = '';
    let name = '';

    const gender = await db
        .collection('categories')
        .findOne({ id: params.gender });

    if (gender == null) res.status(404).send('Not found');

    gender.categories.forEach((category) => {
        if (category.id === params.category) {
            title = category.page_title;
            name = category.name;
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

    const itemsCount = items.length.toString();

    const allCategories = await db.collection('categories').find().toArray();

    let genders = [];
    let categories = [];
    let subcategories = [];

    allCategories.forEach((gender) => {
        if (!genders.includes(gender.name)) genders.push(gender.name);
        gender.categories.forEach((category) => {
            if (!categories.includes(category.name))
                categories.push(category.name);

            category.categories.forEach((subcategory) => {
                if (!subcategories.includes(subcategory.name))
                    subcategories.push(subcategory.name);
            });
        });
    });

    res.render('category', {
        _,
        items,
        title,
        name,
        itemsCount,
        category: params.category,
        subcategory: params.subcategory,
        genders,
        categories,
        subcategories,
    });
};
