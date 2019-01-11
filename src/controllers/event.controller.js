const { Events } = require('../models');

class EventControllerClass {
    async login(req, res) {
        res.success('login');
    }

    async logout(req, res) {
        res.success('logout');
    }
}

module.exports = new EventControllerClass();
