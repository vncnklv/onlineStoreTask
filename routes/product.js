const _ = require('underscore');

module.exports = async function routeCategory(req, res) {
    const { params } = req;

    const { db } = req.app.locals;

    const product = await db.collection('products').findOne({ id: params.id });

    //Validation
    if (product == null) res.status(404).send('Not found');
    console.log(product == null);

    res.render('product', {
        _,
        product,
        title: product.page_title,
    });
};
