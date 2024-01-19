const {videogame, plataforms, generes, users} = require('../db');

// Maneja la creación de un nuevo videojuego
async function postVideoGame(req, res) {
  try {
    // Verifica si ya existe un videojuego con el mismo nombre
    const equal = await videogame.findOne({where: {name: req.body.name}});
    if (equal) {
      throw new Error('Ya existe el videojuego');
    }

    // Mapea las plataformas y géneros del cuerpo de la solicitud
    const platformsArray = req.body.platforms.map(
      (platform) => platform.platform['name'],
    );
    const generesArray = req.body.genres.map((genre) => genre.name);

    // Campos requeridos para la creación del videojuego
    const requiredFields = [
      'name',
      'description',
      'background_image',
      'released',
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    // Maneja casos de campos faltantes o errores en la solicitud
    if (
      missingFields.length > 0 ||
      platformsArray.length === 0 ||
      req.body.rating < 0
    ) {
      return res
        .status(400)
        .send(`Faltan campos obligatorios: ${missingFields.join(', ')}`);
    }

    // Crea géneros y plataformas si no existen, y asocia al videojuego
    const createGenres = generesArray.map(async (genre) => {
      await generes.findOrCreate({
        where: {
          name: genre,
        },
      });
    });

    const createPlatforms = platformsArray.map(async (platform) => {
      await plataforms.findOrCreate({
        where: {
          name: platform,
        },
      });
    });

    await Promise.all(createGenres);
    await Promise.all(createPlatforms);

    // Crea el videojuego en la base de datos
    const [createVideogame, created] = await videogame.findOrCreate({
      where: {
        name: req.body.name,
        description: req.body.description,
        background_image: req.body.background_image,
        background_image_additional: req.body.background_image_additional,
        released: req.body.released,
        rating: req.body.rating,
      },
    });

    // Maneja el caso en que el videojuego ya exista
    if (!created) {
      return res.status(400).send('El videojuego ya existe');
    }

    // Asocia el videojuego al usuario actual
    const session = req.session.user;
    const user = await users.findOne({where: {username: session}});
    if (user) {
      await user.addVideogame(createVideogame);
    } else {
      console.error('Usuario no encontrado al asociar el videojuego.');
    }

    // Obtiene instancias de géneros y plataformas creadas
    const generesInstances = await generes.findAll({
      where: {
        name: generesArray,
      },
    });
    const platformsInstances = await plataforms.findAll({
      where: {
        name: platformsArray,
      },
    });

    // Obtiene nombres de géneros y plataformas
    const platformNames = platformsInstances.map((platform) => platform.name);
    const generesNames = generesInstances.map((genre) => genre.name);

    // Asocia géneros y plataformas al videojuego
    await createVideogame.addGeneres(generesInstances);
    await createVideogame.addPlataforms(platformsInstances);
    await createVideogame.update({platforms: platformNames});
    await createVideogame.update({genres: generesNames});

    res
      .status(200)
      .json(await videogame.findOne({where: {name: req.body.name}}));
  } catch (error) {
    console.error('Error al crear el videojuego:', error.message);
    res.status(500).send('Error interno del servidor');
  }
}

module.exports = postVideoGame;
