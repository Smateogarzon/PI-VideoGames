require('dotenv').config();
const {URL_GET, API_KEY} = process.env;
const {videogame} = require('../db');
const axios = require('axios');

async function getVideogame(req, res) {
  try {
    const {idn} = req.params;
    console.log(idn);
    // Buscar el videojuego en la base de datos
    const dataDb = await videogame.findOne({where: {id: idn}});

    if (dataDb) {
      // Si el videojuego se encuentra en la base de datos, devolverlo
      return res.status(200).json(dataDb);
    }

    // Si no está en la base de datos, obtenerlo de la API externa
    const url = `${URL_GET}/${idn}?key=${API_KEY}`;
    const {data} = await axios(url);

    const {
      id,
      name,
      description,
      platforms,
      background_image,
      background_image_additional,
      released,
      rating,
      genres,
      metacritic,
      updated,
      screenshots_count,
      publishers,
      developers,
      tags,
      ratings,
    } = data;

    if (screenshots_count > 0) {
      const {data} = await axios(`${URL_GET}/${id}/screenshots?key=${API_KEY}`);
      this.screenshots_countArray = data.results.map((screenshot) => {
        return screenshot.image;
      });
    }

    // Crear un objeto con la información del videojuego
    const videoGame = {
      id,
      name,
      description,
      platforms,
      background_image,
      background_image_additional,
      released,
      rating,
      genres,
      metacritic,
      updated,
      screenshots_count: this.screenshots_countArray,
      publishers,
      developers,
      tags,
      ratings,
    };

    res.status(200).json(videoGame);
  } catch (error) {
    console.error('Error al obtener el videojuego:', error.message);
    res.status(500).send('Error interno del servidor');
  }
}

module.exports = getVideogame;
