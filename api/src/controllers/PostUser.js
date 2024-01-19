const bcrypt = require('bcrypt');
const {users} = require('../db');
const Validation = require('../utils/validations');

// Maneja la solicitud para crear un nuevo usuario
async function postUser(req, res) {
  try {
    const {email, password, username} = req.body;

    // Validación personalizada del formato de la contraseña
    const passwordValidationError = Validation(password);

    // Verificar si hay campos obligatorios faltantes
    const requiredFields = ['email', 'password', 'username'];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    // Manejar casos de campos faltantes o errores en la contraseña
    if (missingFields.length > 0) {
      return res.status(400).send(`Faltan datos: ${missingFields.join(', ')}`);
    }
    if (
      passwordValidationError &&
      Object.keys(passwordValidationError).length > 0
    ) {
      return res.status(400).json(passwordValidationError);
    }

    // Verificar si ya existe un usuario con el mismo nombre de usuario o correo electrónico
    const existingUser = await users.findOne({where: {username: username}});
    const existingEmail = await users.findOne({where: {email: email}});

    if (existingUser) {
      return res.status(409).send('El usuario ya existe. Intenta cambiarlo.');
    }
    if (existingEmail) {
      return res
        .status(409)
        .send('El correo electrónico ya ha sido registrado anteriormente.');
    }

    // Hashear la contraseña antes de almacenarla en la base de datos
    const passwordHash = await bcrypt.hash(password, 11);

    // Crear el nuevo usuario
    const [user, created] = await users.findOrCreate({
      where: {email: email, username: username, password: passwordHash},
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

module.exports = postUser;
