const {users} = require('../db');

// Función para obtener la biblioteca de un usuario
async function getLibrary(req, res) {
  try {
    // Obtener la sesión del usuario desde la cookie
    const session = req.session.user;

    // Buscar al usuario en la base de datos utilizando el nombre de usuario
    const userId = await users.findOne({where: {username: session}});

    // Verificar si el usuario fue encontrado
    if (userId) {
      // Obtener la biblioteca del usuario utilizando la relación definida en el modelo
      const userLibrary = await userId.getLibraries();

      res.status(200).json(userLibrary);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    res.status(500).json({Error: error.message});
  }
}

module.exports = getLibrary;
