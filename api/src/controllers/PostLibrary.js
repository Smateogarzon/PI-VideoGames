const { library, videogame, users } = require("../db");
require("dotenv").config();
const { URL_GET, API_KEY } = process.env;
const axios = require("axios");

async function postLibrary(req, res) {
  try {
    const { id } = req.params;
    const videogameDb = await videogame.findOne({ where: { id: id } });
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
      const userId = await users.findOne({ where: { username: session } });

      await vLibrary.addUsers(userId.id);
      return res.status(200).send("Agregado con exito");
    }

    const { data } = await axios(`${URL_GET}/${id}?key=${API_KEY}`);
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
    const userId = await users.findOne({ where: { username: session } });

    await vLibrary.addUsers(userId.id);
    res.status(200).send("Agregado con exito");
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).send("Error interno del servidor");
  }
}

module.exports = postLibrary;
