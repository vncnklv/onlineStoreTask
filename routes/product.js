const _ = require('underscore');
const gender = require('./gender');

module.exports = async function routeCategory(req, res) {
    const { params } = req;
    const { db } = req.app.locals;

    console.log('conn');

    const product = await db
        .collection('products')
        .find({ id: params.id })
        .toArray();

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
    breadcrumb.push(product[0].name);

    res.render('product', {
        _,
        product,
        title: product[0].page_title,
        breadcrumb,
    });
};
