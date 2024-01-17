const {videogame, plataforms, generes} = require('../db');

async function postVideoGame(req, res) {
  try {
    const platformsArray = req.body.platforms.map(
      (platform) => platform.platform['name'],
    );
    const generesArray = req.body.genres.map((genre) => genre.name);

    const {
      name,
      description,
      background_image,
      background_image_additional,
      released,
      rating,
    } = req.body;

    if (
      !name ||
      !description ||
      !platformsArray ||
      !background_image ||
      !released ||
      rating === undefined ||
      !background_image_additional ||
      platformsArray.length === 0 ||
      generesArray.length === 0
    ) {
      const missingFields = [];
      if (!name) missingFields.push('name');
      if (!description) missingFields.push('description');
      if (!platformsArray) missingFields.push('platforms');
      if (!background_image) missingFields.push('background_image');
      if (!released) missingFields.push('released');
      if (rating === undefined) missingFields.push('rating');
      if (!background_image_additional)
        missingFields.push('background_image_additional');
      if (platformsArray.length === 0) missingFields.push('platforms');
      if (generesArray.length === 0) missingFields.push('genres');
      return res
        .status(400)
        .send(`Faltan campos obligatorios: ${missingFields.join(', ')}`);
    }

    await generesArray.forEach(async (genre) => {
      await generes.findOrCreate({
        where: {
          name: genre,
        },
      });
    });

    await platformsArray.forEach(async (platform) => {
      await plataforms.findOrCreate({
        where: {
          name: platform,
        },
      });
    });

    const [createVideogame, created] = await videogame.findOrCreate({
      where: {
        name: name,
        description: description,
        background_image: background_image,
        background_image_additional: background_image_additional,
        released: released,
        rating: rating,
      },
    });
    if (!created) {
      return res.status(400).send('El videojuego ya existe');
    }

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

    const platformIds = platformsInstances.map((platform) => platform.name);
    const generesIds = generesInstances.map((genre) => genre.name);

    await createVideogame.addGeneres(generesInstances);
    await createVideogame.addPlataforms(platformsInstances);
    await createVideogame.update({platforms: platformIds});
    await createVideogame.update({genres: generesIds});
    res.status(200).json(createVideogame);
  } catch (error) {
    console.error('Error al crear el videojuego:', error.message);
    res.status(500).send('Error interno del servidor');
  }
}

module.exports = postVideoGame;
