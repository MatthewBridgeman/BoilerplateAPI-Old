const UserController = require('./../controllers/user.controller');

module.exports = (router) => {
    router.get('/getUser/:id', UserController.getUser);
};
