const _ = require('underscore');
const limitValsGen = ['mens', 'womens'];
const limitValsCat = [
    'mens-clothing',
    'mens-accessories',
    'womens-clothing',
    'womens-jewelry',
    'womens-accessories',
];
module.exports = async function routeCategory(req, res) {
    const { params } = req;

    // Verification
    if (!limitValsGen.includes(params.gender)) res.send(404);
    if (!limitValsCat.includes(params.category)) res.send(404);

    const { db } = req.app.locals;

    let title = '';

    const gender = await db
        .collection('categories')
        .find({ id: params.gender })
        .toArray();

    const breadcrumb = [];
    breadcrumb.push(gender[0].name);
    gender.forEach((cat) => {
        cat.categories.forEach((category) => {
            if (category.id === params.category) {
                breadcrumb.push(category.name);
                title = category.page_title;
            }
        });
    });

    let items = [];

    const products = await db.collection('products').find().toArray();
    products.forEach((item) => {
        if (item.primary_category_id.startsWith(params.category))
            items.push(item);
    });

    res.render('category', {
        _,
        items,
        title,
        category: params.category,
        breadcrumb,
    });
};
