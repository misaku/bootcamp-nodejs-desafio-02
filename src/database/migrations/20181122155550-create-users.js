"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */
        return queryInterface.createTable("users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING
            },
            avatar: {
                allowNull: false,
                type: Sequelize.STRING
            },
            password_hash: {
                allowNull: false,
                type: Sequelize.STRING
            },
            provider: {
                allowNull: false,
                defaultValue: false,
                type: Sequelize.BOOLEAN
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }
        );
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
        return queryInterface.dropTable("users");
    }
};
