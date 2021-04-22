'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Raw extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Raw.init({
    rowkey: DataTypes.STRING,
    source_date: DataTypes.DATE,
    location: DataTypes.STRING,
    radius: DataTypes.INTEGER,
    confidence: DataTypes.INTEGER,
    mode: DataTypes.STRING,
    satellite: DataTypes.STRING,
    kecamatan: DataTypes.STRING,
    kabupaten: DataTypes.STRING,
    provinsi: DataTypes.STRING,
    created_at: DataTypes.STRING,
    original_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Raw',
  });
  return Raw;
};