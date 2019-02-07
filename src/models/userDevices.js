module.exports = (sequelize, DataTypes) => {
    const UserDevices = sequelize.define('UserDevices', {
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
        deviceId: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        deviceName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        loggedIn: {
            type: DataTypes.INTEGER(1).UNSIGNED,
            allowNull: false,
            unsigned: true,
            defaultValue: 0,
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

    return UserDevices;
};
