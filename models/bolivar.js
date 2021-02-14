'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bolivar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Bolivar.init({
    value: DataTypes.DOUBLE
  }, {
    timestamps: true,
    sequelize,
    modelName: 'Bolivar',
  });
  return Bolivar;
};