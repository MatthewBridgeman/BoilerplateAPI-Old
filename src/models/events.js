module.exports = (sequelize, DataTypes) => {
    const Events = sequelize.define('Events', {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            unsigned: true,
        },
        type: {
            type: DataTypes.ENUM('message', 'redaction'),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        sender: {
            type: DataTypes.STRING(255),
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

    return Events;
};
