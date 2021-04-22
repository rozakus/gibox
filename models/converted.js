'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Converted extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Converted.init({
    hotspottime: DataTypes.DATE,
    provinsi: DataTypes.STRING,
    kabupaten: DataTypes.STRING,
    kecamatan: DataTypes.STRING,
    long: DataTypes.INTEGER,
    lat: DataTypes.INTEGER,
    satellite: DataTypes.STRING,
    confidence: DataTypes.STRING,
    titik: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Converted',
  });
  return Converted;
};