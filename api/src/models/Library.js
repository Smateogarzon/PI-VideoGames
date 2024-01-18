const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const library = sequelize.define(
    "library",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'El campo "name" no puede ser nulo.',
          },
          notEmpty: {
            msg: 'El campo "name" no puede estar vacío.',
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),

        defaultValue: [],
      },
      genres: {
        type: DataTypes.ARRAY(DataTypes.STRING),

        defaultValue: [],
      },
      background_image: {
        type: DataTypes.STRING,

        validate: {
          isUrl: {
            msg: 'El campo "image" debe ser una URL válida.',
          },
        },
      },
      background_image_additional: {
        type: DataTypes.STRING,

        validate: {
          isUrl: {
            msg: 'El campo "image" debe ser una URL válida.',
          },
        },
      },
      released: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate: {
            msg: 'El campo "releaseDate" debe ser una fecha válida.',
          },
        },
      },
      rating: {
        type: DataTypes.FLOAT,

        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );

  return library;
};
