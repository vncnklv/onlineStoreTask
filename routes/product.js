const _ = require('underscore');
const soap = require('soap');
const { result } = require('underscore');
const url = 'http://infovalutar.ro/curs.asmx?wsdl';

module.exports = async function routeCategory(req, res) {
    const { params } = req;

    const { db } = req.app.locals;

    const product = await db.collection('products').findOne({ id: params.id });
    if (product == null) res.status(404).send('Not found');

    // sync

    soap.createClient(url, (err, client) => {
        client.getlatestvalue({ Moneda: 'USD' }, (err, result) => {
            console.log(result);
        });
    });

    // getlatestvalue is not async function, so this cant happen async

    // const client = await soap.createClientAsync(url);
    // const currency = await client.getlatestvalue({ Moneda: 'EUR' });
    // console.log(currency);

    res.render('product', {
        _,
        product,
        title: product.page_title,
    });
};
