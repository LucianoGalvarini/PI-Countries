const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("country", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validator: {
        len: [3],
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flagImg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subRegion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.STRING,
    },
    population: {
      type: DataTypes.INTEGER,
    },
  });
};
