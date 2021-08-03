module.exports = async function routeFilter(req, res) {
    res.setHeader('Content-Type', 'application/json');

    const { db } = req.app.locals;

    const values = req.body;
};
