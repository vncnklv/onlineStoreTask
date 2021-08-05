const _ = require('underscore');
const soap = require('soap');
const url = 'http://infovalutar.ro/curs.asmx?wsdl';

module.exports = async function routeCategory(req, res) {
    const { params } = req;

    const { db } = req.app.locals;

    const product = await db.collection('products').findOne({ id: params.id });
    if (product == null) res.status(404).send('Not found');

    const client = await soap
        .createClientAsync(url)
        .catch((err) => console.error(err));

    function getLatestValue() {
        return new Promise((resolve, reject) => {
            client.getlatestvalue({ Moneda: 'USD' }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }

    const currency = await getLatestValue().catch((err) => console.error(err));

    res.render('product', {
        _,
        product,
        title: product.page_title,
        currency: currency.getlatestvalueResult,
    });
};
