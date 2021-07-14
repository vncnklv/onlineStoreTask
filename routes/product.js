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

    res.render('product', {
        _,
        product,
        title: product.page_title,
    });
};
