const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { signUpValidation, loginValidation } = require('./../helpers/validation.helper');
const { jwt } = require('./../config/main');

const { Users } = require('./../models');

class AuthControllerClass {
    async signup(req, res) {
        const { firstName, lastName, email, password } = req.body;

        const validationError = signUpValidation(firstName, lastName, email, password);
        if (validationError) return res.validationError(validationError);

        const hashedPassword = bcrypt.hashSync(password, 8);
        const values = { email, firstName, lastName, password: hashedPassword };
        const user = await Users.create(values);

        return res.success(
            {
                userId: user.id,
                email,
            },
            'User successfully created.',
            201,
        );
    }

    async login(req, res) {
        const { email, password } = req.body;

        const validationError = loginValidation(email, password);
        if (validationError) return res.validationError(validationError);

        const options = {
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'deletedAt'],
            },
            where: {
                email,
            },
        };

        const user = await Users.findOne(options);
        if (!user) return res.authentificationError('User not found.');

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.authentificationError('Password does not match.');
        user.password = undefined;

        const token = jsonWebToken.sign(
            { id: user._id },
            jwt.secret,
            {  expiresIn: jwt.expiry },
        );

        res.success({
            token,
            user,
        });
    }

    async logout(req, res) {
        res.success('logout');
    }
}

module.exports = new AuthControllerClass();
