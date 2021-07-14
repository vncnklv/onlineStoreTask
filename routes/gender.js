const _ = require('underscore');

module.exports = async function routeGender(req, res) {
    const { params } = req;

    const { db } = req.app.locals;

    let items = await db
        .collection('categories')
        .findOne({ id: params.gender });

    if (items == null) res.status(404).send('Not found');

    if (params.category) {
        let notFound = true;
        items.categories.forEach((category) => {
            if (category.id == params.category) {
                items = category;
                notFound = false;
            }
        });
        if (notFound) res.status(404).send('Not found');
    }

    res.render('gender', {
        _,
        items,
        title: items.page_title,
    });
};
