  const { Sequelize, DataTypes, Model } = require("sequelize");
  const {sequelize} = require("../config");


  class AgentApplication extends Model {}

  AgentApplication.init(
    {
      names:DataTypes.STRING,
      telephone:DataTypes.STRING(10),
      email_address:DataTypes.STRING,
      address: DataTypes.STRING,
      level:DataTypes.STRING,
      program: DataTypes.JSON(DataTypes.STRING), // Assumes this field stores an array
      course: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Agent_Application",
      timestamps: true,
    }
  );

  module.exports = { AgentApplication };
