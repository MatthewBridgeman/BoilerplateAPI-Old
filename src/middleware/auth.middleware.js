const jsonWebToken = require('jsonwebtoken');

const { jwt } = require('./../config/main');

const { Users } = require('./../models');

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) return res.authentificationError('Authorization token required.');

    const token = req.headers.authorization.replace('Bearer ', '');
    const { userId } = await jsonWebToken.verify(token, jwt.secret);
    if (!userId) return res.authentificationError('Authorization token invalid.');

    const options = {
        attributes: {
            exclude: ['password', 'updatedAt', 'createdAt', 'deletedAt'],
        },
    };
    const user = await Users.findByPk(userId, options);
    if (!user) return res.authentificationError('Authorization token invalid.');

    req.user = user;

    return next();
};
