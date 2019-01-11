module.exports = (sequelize, DataTypes) => {
    const Events = sequelize.define('Events', {
        id: {
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            unique: true,
            unsigned: true,
        },
        type: {
            allowNull: false,
            type: DataTypes.ENUM('message', 'redaction'),
        },
        content: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        sender: {
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

    return Events;
};
