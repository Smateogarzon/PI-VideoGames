require('dotenv').config();
const {URL_GETNAME, API_KEY} = process.env;
const {videogame} = require('../db');
const {Op} = require('sequelize');
const axios = require('axios');

async function getNameVideoGame(req, res) {
  const {name} = req.query;

  try {
    if (name === '') {
      return res.status(200).json([]);
    }
    // Contar la cantidad de videojuegos en la base de datos
    const count = await videogame.count();

    if (count) {
      try {
        // Buscar videojuegos en la base de datos que coincidan con el nombre
        const nameDb = await videogame.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
          limit: 5,
        });

        if (nameDb.length === 0) {
          // Si no se encuentra en la base de datos, buscar en la API externa
          throw new Error(
            'No se encontró el videojuego en la DB, buscando en la API externa',
          );
        }

        // Mapear los nombres encontrados en la base de datos
        const finalName = nameDb.map((game) => ({
          id: game.id,
          name: game.name,
          image: game.background_image,
          platforms: game.platforms.map((platform) => platform.platform.name),
        }));
        res.cookie('miCookie', 'valorDeLaCookie', {
          sameSite: 'None',
          secure: true,
          httpOnly: true,
        });
        return res.status(200).json(finalName);
      } catch (error) {
        // En caso de error al buscar en la base de datos, buscar en la API externa
        const nameApi = await getNameApi(name);
        return res.status(200).json(nameApi);
      }
    }

    // Si no hay videojuegos en la base de datos, buscar en la API externa directamente
    res.cookie('miCookie', 'valorDeLaCookie', {
      sameSite: 'None',
      secure: true,
      httpOnly: true,
    });
    res.status(200).json(await getNameApi(name));
  } catch (error) {
    console.error('Nombre no encontrado:', error.message);
    res.status(500).send(error.message);
  }
}

// Función para obtener nombres de videojuegos desde la API externa
const getNameApi = async (name) => {
  try {
    // Obtener datos de la API externa
    const {data} = await axios(`${URL_GETNAME}=${name}&key=${API_KEY}`);

    if (data.count === 0) {
      // Si no se encuentra en la API externa, lanzar un error
      throw new Error('No se encontró el videojuego. Inténtelo de nuevo.');
    }

    // Mapear los nombres encontrados en la API externa
    const firstElement = data.results.slice(0, 5).map((game) => ({
      id: game.id,
      name: game.name,
      image: game.background_image,
      platforms: game.platforms.map((platform) => platform.platform.name),
    }));

    return firstElement;
  } catch (error) {
    // Manejar errores de la API externa y lanzar un mensaje amigable
    throw new Error('No se encontró el videojuego. Inténtelo de nuevo.');
  }
};

// Exportar la función principal para su uso en otras partes de la aplicación
module.exports = getNameVideoGame;
