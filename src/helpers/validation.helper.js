const validator = require('validator');

const isString = varArray => varArray.every(variable => typeof variable === 'string');

module.exports = {
    signUpValidation(firstName, lastName, email, password) {
        switch (true) {
            case (!firstName || !lastName || !email || !password):
                return ('First name, last name, email and password are required fields for signup.');

            case (!isString([firstName, lastName, email, password])):
                return ('First name, last name, email and password must be strings.');

            case (!validator.isLength(firstName, { min: 1, max: 255 })):
                return ('First name must be between 1 and 255 characters.');

            case (!validator.isLength(lastName, { min: 1, max: 255 })):
                return ('Last name must be between 1 and 255 characters.');

            case (!validator.isLength(email, { min: 1, max: 255 })):
                return ('Email must be between 1 and 255 characters.');

            case (!validator.isLength(password, { min: 8, max: 255 })):
                return ('Password must be between 8 and 60 characters.');

            case (!validator.isEmail(email)):
                return ('Email must be in a valid format.');

            default:
                return false;
        }
    },

    loginValidation(email, password) {
        switch (true) {
            case (!email || !password):
                return ('Email and password are required fields for login.');

            case (!isString([email, password])):
                return ('Email and password must be strings.');

            case (!validator.isLength(email, { min: 1, max: 255 })):
                return ('Email must be between 1 and 255 characters.');

            case (!validator.isLength(password, { min: 8, max: 255 })):
                return ('Password must be between 8 and 60 characters.');

            case (!validator.isEmail(email)):
                return ('Email must be in a valid format.');

            default:
                return false;
        }
    },
};
