const _ = require('underscore');

module.exports = async function routeCategory(req, res) {
    const { params } = req;
    const { db } = req.app.locals;

    console.log('conn');

    const product = await db
        .collection('products')
        .find({ id: params.id })
        .toArray();

    console.log('sent');

    res.render('product', {
        _,
        product,
        title: product.page_title,
        category: params.category,
        gender: params.gender,
    });
};
