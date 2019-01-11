const EventController = require('./../controllers/event.controller');

module.exports = (router) => {
    router.get('/login2', EventController.login);

    router.get('/logout2', EventController.logout);
};
