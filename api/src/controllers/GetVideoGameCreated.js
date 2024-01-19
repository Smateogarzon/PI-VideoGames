const {users, videogame} = require('../db');

// Función para obtener los videojuegos asociados a un usuario
async function getUserVideoGames(req, res) {
  try {
    // Obtener la sesión del usuario desde la cookie
    const session = req.session.user;

    // Buscar al usuario en la base de datos utilizando el nombre de usuario
    const userId = await users.findOne({where: {username: session}});

    // Buscar al usuario con sus videojuegos asociados
    const userWithVideoGames = await users.findByPk(userId.id, {
      include: videogame,
    });

    // Verificar si el usuario fue encontrado
    if (!userWithVideoGames) {
      return res.status(404).send('Usuario no encontrado');
    }

    // Extraer la lista de videojuegos asociados al usuario
    const userVideoGames = userWithVideoGames.videogames;

    res.status(200).json(userVideoGames);
  } catch (error) {
    console.error(
      'Error al obtener los videojuegos del usuario:',
      error.message,
    );
    res.status(500).send('Error interno del servidor');
  }
}

module.exports = getUserVideoGames;
