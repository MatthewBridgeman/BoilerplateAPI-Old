const ErrorWrap = require('./../middleware/errorWrap.middleware');
const AuthMiddleware = ErrorWrap(require('./../middleware/auth.middleware'));
const AuthController = require('./../controllers/auth.controller');

module.exports = (router) => {
    router.get('/signup', ErrorWrap(AuthController.signup));

    router.get('/login', ErrorWrap(AuthController.login));

    router.get('/logout', AuthMiddleware, ErrorWrap(AuthController.logout));
};
