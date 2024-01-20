const {DataTypes} = require('sequelize');

module.exports = (sequalize) => {
  const generes = sequalize.define(
    'generes',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,

        validator: {
          isUrl: {
            msg: 'El campo "image" debe ser una URL válida.',
          },
        },
      },
    },
    {
      timestamps: false,
    },
  );
  return generes;
};
