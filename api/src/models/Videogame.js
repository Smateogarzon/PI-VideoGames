const {DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const videogame = sequelize.define(
    'videogame',
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
        beforeValidate: function (user) {
          if (user.name) {
            user.name = user.name.toLowerCase();
          }
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'El campo "description" no puede ser nulo.',
          },
          notEmpty: {
            msg: 'El campo "description" no puede estar vacío.',
          },
        },
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
      genres: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
      background_image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'El campo "image" no puede ser nulo.',
          },
          notEmpty: {
            msg: 'El campo "image" no puede estar vacío.',
          },
          isUrl: {
            msg: 'El campo "image" debe ser una URL válida.',
          },
        },
      },
      background_image_additional: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'El campo "image" no puede ser nulo.',
          },
          notEmpty: {
            msg: 'El campo "image" no puede estar vacío.',
          },
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
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    },
  );
  return videogame;
};
