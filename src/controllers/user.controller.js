const { Users } = require('../models');

class UserControllerClass {
    async getUser(req, res) {
        const options = {
            where: {
                id: req.params.id,
            },
        };

        const user = await this.Users.findOne(options);
        res.success(user);
    }
}

module.exports = new UserControllerClass();
