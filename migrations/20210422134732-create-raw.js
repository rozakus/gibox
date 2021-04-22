'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Raws', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rowkey: {
        type: Sequelize.STRING
      },
      source_date: {
        type: Sequelize.DATE
      },
      location: {
        type: Sequelize.STRING
      },
      radius: {
        type: Sequelize.INTEGER
      },
      confidence: {
        type: Sequelize.INTEGER
      },
      mode: {
        type: Sequelize.STRING
      },
      satellite: {
        type: Sequelize.STRING
      },
      kecamatan: {
        type: Sequelize.STRING
      },
      kabupaten: {
        type: Sequelize.STRING
      },
      provinsi: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.STRING
      },
      original_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Raws');
  }
};