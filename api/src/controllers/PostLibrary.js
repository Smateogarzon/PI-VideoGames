const {library, videogame, users} = require('../db');
require('dotenv').config();
const {URL_GET, API_KEY} = process.env;
const axios = require('axios');

// Maneja la solicitud para agregar un videojuego a la biblioteca del usuario
async function postLibrary(req, res) {
  try {
    const {id} = req.params;

    // Buscar el videojuego en la base de datos local
    const videogameDb = await videogame.findOne({where: {id: id}});

    if (videogameDb) {
      const {
        name,
        description,
        platforms,
        background_image,
        background_image_additional,
        released,
        rating,
        genres,
      } = videogameDb;

      // Buscar el videojuego en la biblioteca local
      const videogameLb = await library.findOne({
        where: {name: name},
      });

      if (videogameLb) {
        // Si el videojuego ya está en la biblioteca, verificar si está asociado al usuario
        const session = req.session.user;
        const userId = await users.findOne({where: {username: session}});
        const userLibrary = await videogameLb.getUsers({
          where: {id: userId.id},
        });

        if (userLibrary.length > 0) {
          // Si ya está asociado al usuario, lanzar un error
          throw new Error(
            'Ya existe el videojuego en la biblioteca del usuario',
          );
        }

        // Agregar el videojuego a la biblioteca del usuario
        await videogameLb.addUsers(userId.id);
        return res.status(200).send('Agregado con éxito');
      }

      // Si el videojuego no está en la biblioteca local, agregarlo
      const vLibrary = await library.create({
        name: name,
        description: description,
        platforms: platforms,
        background_image: background_image,
        background_image_additional: background_image_additional,
        released: released,
        rating: rating,
        genres: genres,
      });

      const session = req.session.user;
      const userId = await users.findOne({where: {username: session}});

      // Asociar el videojuego al usuario
      await vLibrary.addUsers(userId.id);
      return res.status(200).send('Agregado con éxito');
    }

    // Si el videojuego no está en la base de datos local, buscarlo en la API externa
    const {data} = await axios(`${URL_GET}/${id}?key=${API_KEY}`);
    const {
      name,
      description,
      platforms,
      background_image,
      background_image_additional,
      released,
      rating,
      genres,
    } = data;

    const platformsArray = platforms.map((e) => e.platform.name);
    const genresArray = genres.map((e) => e.name);

    // Buscar el videojuego en la biblioteca local
    const videogameLb = await library.findOne({
      where: {name: name},
    });

    if (videogameLb) {
      // Si el videojuego ya está en la biblioteca, verificar si está asociado al usuario
      const session = req.session.user;
      const userId = await users.findOne({where: {username: session}});
      const userLibrary = await videogameLb.getUsers({
        where: {id: userId.id},
      });

      if (userLibrary.length > 0) {
        // Si ya está asociado al usuario, lanzar un error
        throw new Error('Ya existe el videojuego en la biblioteca del usuario');
      }

      // Agregar el videojuego a la biblioteca del usuario
      await videogameLb.addUsers(userId.id);
      return res.status(200).send('Agregado con éxito');
    }

    // Si el videojuego no está en la biblioteca local, agregarlo
    const vLibrary = await library.create({
      name: name,
      description: description,
      platforms: platformsArray,
      background_image: background_image,
      background_image_additional: background_image_additional,
      released: released,
      rating: rating,
      genres: genresArray,
    });

    const session = req.session.user;
    const userId = await users.findOne({where: {username: session}});

    // Asociar el videojuego al usuario
    await vLibrary.addUsers(userId.id);
    return res.status(200).send('Agregado con éxito');
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Error interno del servidor');
  }
}

module.exports = postLibrary;
