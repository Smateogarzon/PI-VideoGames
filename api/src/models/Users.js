const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const users = sequelize.define("users", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El campo "username" no puede ser nulo.',
        },
        notEmpty: {
          msg: 'El campo "username" no puede estar vacío.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'El campo "email" no puede ser nulo.',
        },
        notEmpty: {
          msg: 'El campo "email" no puede estar vacío.',
        },
        isEmail: {
          msg: 'El campo "email" debe ser una dirección de correo electrónico válida.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El campo "password" no puede ser nulo.',
        },
        notEmpty: {
          msg: 'El campo "password" no puede estar vacío.',
        },
      },
    },
  });

  return users;
};
