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

    // Make verification here
    if (!limitValsGen.includes(params.gender)) res.send(404);
    if (!limitValsCat.includes(params.category)) res.send(404);

    const { db } = req.app.locals;

    const product = await db.collection('products').findOne({ id: params.id });

    if (product.length == 0) res.send(404);

    const genderInfo = await db
        .collection('categories')
        .find({ id: params.gender })
        .toArray();

    const breadcrumb = [];
    breadcrumb.push(genderInfo[0].name);
    genderInfo.forEach((cat) => {
        cat.categories.forEach((category) => {
            if (category.id === params.category) {
                breadcrumb.push(category.name);
            }
        });
    });
    breadcrumb.push(product.name);

    res.render('product', {
        _,
        product,
        title: product.page_title,
        breadcrumb,
    });
};
