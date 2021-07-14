const _ = require('underscore');

module.exports = function routeIndex(req, res) {
    res.render('index', {
        _,
        title: 'this is the home page',
        breadcrumb: null,
    });
};
