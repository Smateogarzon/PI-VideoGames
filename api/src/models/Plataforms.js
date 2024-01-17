const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const plataforms = sequelize.define(
    'plataforms',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );
  return plataforms;
};
