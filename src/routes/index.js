const router = require('express').Router();
const Default = require('./default.route');
const Auth = require('./auth.route');
const Events = require('./event.route');
const User = require('./user.route');

Default(router);
Auth(router);
Events(router);
User(router);

module.exports = router;
