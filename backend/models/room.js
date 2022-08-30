'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      this.hasMany(models.Lesson_in_Week, {foreignKey: 'room_id', as: 'lessons'})
    }
  }
  Room.init({
    number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};