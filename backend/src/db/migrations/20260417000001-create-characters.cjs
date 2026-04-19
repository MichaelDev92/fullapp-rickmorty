'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('characters', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      external_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      name: { type: Sequelize.STRING(120), allowNull: false },
      status: {
        type: Sequelize.ENUM('Alive', 'Dead', 'unknown'),
        allowNull: false,
      },
      species: { type: Sequelize.STRING(80), allowNull: false },
      type: { type: Sequelize.STRING(80), allowNull: true },
      gender: {
        type: Sequelize.ENUM('Female', 'Male', 'Genderless', 'unknown'),
        allowNull: false,
      },
      origin_name: { type: Sequelize.STRING(120), allowNull: true },
      origin_url: { type: Sequelize.STRING(255), allowNull: true },
      location_name: { type: Sequelize.STRING(120), allowNull: true },
      image: { type: Sequelize.STRING(255), allowNull: true },
      episodes_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created: { type: Sequelize.DATE, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });

    await queryInterface.addIndex('characters', ['name']);
    await queryInterface.addIndex('characters', ['status']);
    await queryInterface.addIndex('characters', ['species']);
    await queryInterface.addIndex('characters', ['gender']);
    await queryInterface.addIndex('characters', ['origin_name']);
    await queryInterface.addIndex('characters', ['deleted_at']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('characters');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_characters_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_characters_gender";');
  },
};
