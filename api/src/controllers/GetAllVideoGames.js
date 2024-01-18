require("dotenv").config();
const { URL_GET, API_KEY } = process.env;
const { videogame } = require("../db");
const axios = require("axios");

async function getVideogame(req, res) {
  try {
    const { id } = req.params;
    const dataDb = await videogame.findOne({ where: { id } });
    if (dataDb) {
      return res.status(200).json(dataDb);
    }
    const url = `${URL_GET}/${id}?key=${API_KEY}`;
    const { data } = await axios(url);
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

    const videoGame = {
      name,
      description,
      platforms,
      background_image,
      background_image_additional,
      released,
      rating,
      genres,
    };

    res.status(200).json(videoGame);
  } catch (error) {
    console.error("Error al obtener el videojuego:", error.message);
    res.status(500).send("Error interno del servidor");
  }
}

module.exports = getVideogame;
