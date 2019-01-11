const AuthController = require('./../controllers/auth.controller');
const ErrorWrap = require('./../middleware/errorWrap.middleware');

module.exports = (router) => {
    router.get('/login', AuthController.login);

    router.get('/logout', AuthController.logout);

    router.get('/signup', ErrorWrap(AuthController.signup));
};
