module.exports = (sequelize, DataTypes) => {
    const UserRoles = sequelize.define('UserRoles', {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            unsigned: true,
        },
        userId: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            unsigned: true,
        },
        role: {
            type: DataTypes.ENUM('customer', 'support', 'admin'),
            allowNull: false,
        },
        updatedAt: {
            type: 'TIMESTAMP',
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        createdAt: {
            type: 'TIMESTAMP',
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        deletedAt: {
            type: 'TIMESTAMP',
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        paranoid: true,
        timestamps: true,
    });

    return UserRoles;
};
