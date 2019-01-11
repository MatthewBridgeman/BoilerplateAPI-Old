module.exports = routeFunction => async (req, res, next) => {
    try {
        await routeFunction(req, res, next);
    } catch (error) {
        res.serverError(error);
    }
};
