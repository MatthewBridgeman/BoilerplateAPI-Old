module.exports = (router) => {
    router.get('/', (req, res) => { res.success(undefined, 'Everything working as expected (probably).'); });
};
