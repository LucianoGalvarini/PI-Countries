const { DataTypes } = require("sequelize");
const Country = require("./Country");
const Activity = require("./Activity");

module.exports = (sequelize) => {
  sequelize.define(
    "CountryActivities",
    {
      countryId: {
        type: DataTypes.STRING,
        refereces: {
          model: Country,
          key: "id",
        },
      },

      activityId: {
        type: DataTypes.INTEGER,
        refereces: {
          model: Activity,
          key: "id",
        },
      },
    },
    { timestamps: false }
  );
};
