module.exports = {
    up: async (queryInterface, Sequelize) =>
        await queryInterface.createTable("Email_config", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            host: {
                type: Sequelize.STRING,
                allowNull: true
            },
            user: {
                type: Sequelize.STRING,
                allowNull: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: true
            },
            port: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            tls: {
                type: Sequelize.STRING,
                allowNull: true
            },
            webmail: Sequelize.STRING,
            template: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            template_footer: Sequelize.TEXT,
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }),
    down: async (queryInterface /* , Sequelize */) => await queryInterface.dropTable("Email_config"),
  }