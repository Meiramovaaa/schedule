'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    

    await queryInterface.bulkInsert('Mentors', [
    {
      full_name: 'Ziya Meiramova',
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      full_name: "Dinmukhamed Tleuzhanuly",
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      full_name: "Almas Abdulgaliev",
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      full_name: "Nurailym Khudaibergenqyzy",
      createdAt:new Date(),
      updatedAt:new Date()
    },
  ], {})

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Mentors', null, {});
  }
};
