module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            unique: true,
            unsigned: true,
        },
        firstName: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        lastName: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        email: {
            allowNull: false,
            type: DataTypes.ENUM('message', 'redaction'),
            unique: true,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        updatedAt: {
            allowNull: false,
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        createdAt: {
            allowNull: false,
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        deletedAt: {
            allowNull: false,
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        paranoid: true,
        timestamps: true,
    });

    return Users;
};
