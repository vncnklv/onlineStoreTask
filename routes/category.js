const _ = require('underscore');

module.exports = async function routeCategory(req, res) {
    const { params } = req;
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
