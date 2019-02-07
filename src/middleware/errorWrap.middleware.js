module.exports = routeFunction => async (req, res, next) => {
    try {
        await routeFunction(req, res, next);
    } catch (err) {
        res.serverError(err);
    }
};
