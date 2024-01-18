const { videogame, plataforms, generes } = require("../db");

async function postVideoGame(req, res) {
  try {
    const equal = await videogame.findOne({ where: { name: req.body.name } });
    console.log(equal);
    if (equal) {
      throw new Error("Ya existe el videojuego");
    }
    const platformsArray = req.body.platforms.map(
      (platform) => platform.platform["name"]
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

    const requiredFields = [
      "name",
      "description",
      "background_image",
      "released",
      "background_image_additional",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (
      missingFields.length > 0 ||
      platformsArray.length === 0 ||
      generesArray.length === 0 ||
      req.body.rating < 0
    ) {
      return res
        .status(400)
        .send(`Faltan campos obligatorios: ${missingFields.join(", ")}`);
    }

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
      return res.status(400).send("El videojuego ya existe");
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

    const platformNames = platformsInstances.map((platform) => platform.name);
    const generesNames = generesInstances.map((genre) => genre.name);

    await createVideogame.addGeneres(generesInstances);
    await createVideogame.addPlataforms(platformsInstances);
    await createVideogame.update({ platforms: platformNames });
    await createVideogame.update({ genres: generesNames });
    res.status(200).json(await videogame.findOne({ where: { name: name } }));
  } catch (error) {
    console.error("Error al crear el videojuego:", error.message);
    res.status(500).send("Error interno del servidor");
  }
}

module.exports = postVideoGame;
