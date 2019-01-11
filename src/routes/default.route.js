const moment = require('moment');

module.exports = (router) => {
    router.get('/', (req, res) => { res.ok('<b>Everything working as expected (probably).</b> '); });

    router.head('/ping', (req, res) => { res.sendStatus(200); });
    router.get('/ping', (req, res) => { res.sendStatus(200); });

    router.get('/servertime', (req, res) => { res.ok({ servertime: moment.utc().format() }); });
};
